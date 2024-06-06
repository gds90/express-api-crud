const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTag = (data, callback) => {
    prisma.tag.create({
        data
    })
        .then(newTag => callback(newTag))
        .catch(err => console.error(err));
};

const createTags = (tags, callback) => {
    prisma.tag.createMany({
        data: tags.map(tag => ({ name: tag }))
    })
        .then(count => callback(count))
        .catch(err => console.error(err))
};

module.exports = {
    createTag,
    createTags
}