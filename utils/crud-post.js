const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// implementate tutte le operazioni CRUD per il modello Post, ovvero:
// Una funzione che consente di creare un Post.
const createPost = (data, callback) => {
    prisma.post.create({ data })
        .then(newPost => callback(newPost))
        .catch(error => console.error(error));
}

// Una funzione che permette di leggere un Post usando lo slug.
const readPostBySlug = (slug, callback) => {
    prisma.post.findUnique({
        where: { slug },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
            category: true,
        }
    })
        .then(post => callback(post))
        .catch(error => console.error(error));
}

// Una funzione che restituisce l'elenco di tutti i Post.
const readAllPosts = (callback) => {
    prisma.post.findMany()
        .then(posts => callback(posts))
        .catch(error => console.error(error));
}
// Una funzione che consente di modificare un Post.
const updatePost = (slug, data, callback) => {
    prisma.post.update({ where: { slug }, data })
        .then(updatedPost => callback(updatedPost))
        .catch(error => console.error(error));
}

// Una funzione che elimina un Post.
const deletePost = (slug) => {
    prisma.post.delete({ where: { slug } })
        .then(() => console.log(`Post con slug ${slug} eliminato`))
        .catch(error => console.error(error));
}

// BONUS: Crea una funzione che restituisca solo i Post pubblicati.
const readPublishedPosts = (callback) => {
    prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
            category: true,
        }
    })
        .then(posts => callback(posts))
        .catch(error => console.error(error));
}

// BONUS: Crea una funzione che restituisca solo i Post che contengono una determinata stringa nel contenuto.
const readPostsByContent = (content, callback) => {
    prisma.post.findMany({
        where: {
            content: {
                contains: content
            }
        },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
            category: true,
        }
    })
        .then(posts => {
            if (posts.length === 0) {
                console.log('Nessun post include la stringa inserita');
            } else {
                callback(posts);
            }
        })
        .catch(error => console.error(error));
}

module.exports = {
    createPost,
    readPostBySlug,
    readAllPosts,
    updatePost,
    deletePost,
    readPublishedPosts,
    readPostsByContent
}