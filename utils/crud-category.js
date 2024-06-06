const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = (data, callback) => {
    prisma.category.create({
        data
    })
        .then(newCategory => callback(newCategory))
        .catch(err => console.error(err));
};

const createCategories = (categories, callback) => {
    prisma.category.createMany({
        data: categories.map(category => ({ name: category }))
    })
        .then(count => callback(count))
        .catch(err => console.error(err))
};

module.exports = {
    createCategory,
    createCategories
}