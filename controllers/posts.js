const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
    const { title, slug, content, published, category, tags } = req.body;

    const data = {
        title,
        slug,
        content,
        published,
        category: { connect: { id: category } },
        tags: { connect: tags.map(tagId => ({ id: tagId })) }
    }

    try {
        const post = await prisma.post.create({ data });
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore durante la creazione del post" });
    }
}

const index = async (req, res) => {
    try {
        const where = {};
        const { published, content, page = 1, limit = 5 } = req.query;

        if (published) {
            where.published = published === 'true';
        }

        if (content) {
            where.OR = [
                { content: { contains: content } },
                { title: { contains: content } }
            ];
        }

        // Query per la paginazione
        const totalItems = await prisma.post.count({ where });
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;

        const posts = await prisma.post.findMany({
            where,
            include: {
                tags: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: parseInt(limit)
        });
        res.json({
            posts,
            totalPages,
            currentPage: parseInt(page),
            totalItems
        });
    } catch (error) {
        console.error("Errore durante la lettura dei post:", error);
        res.status(500).json({
            message: "Errore durante la lettura dei post"
        });
    }
}

const show = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({ where: { slug } });

        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore del server" });
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({
            where: { slug },
        });

        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: req.body
        });

        res.json({ message: "Post aggiornato con successo", updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore del server" });
    }
}

const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        await prisma.post.delete({
            where: { slug }
        });

        res.json({ message: "Post eliminato con successo" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore del server" });
    }
}

module.exports = {
    store,
    show,
    index,
    update,
    destroy
}