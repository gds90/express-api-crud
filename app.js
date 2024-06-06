// const {
//     createCategory,
//     createCategories
// } = require('./utils/crud-category.js');

// const {
//     createTag,
//     createTags
// } = require('./utils/crud-tag.js');

// Creazione categorie
// createCategories(['Cucina', 'Sport', 'Tecnologia'], count => console.log(count));
// createCategory({ name: 'Musica' }, newCategory => console.log('Nuova categoria inserita: ', newCategory));

// // Creazione tag
// createTags(['Pasta', 'Torta', 'Gelato', 'Calcio', 'Basket', 'Tennis', 'Pallavolo', 'Smartphone', 'Computer', 'Programmazione', 'Concerto', 'Spettacolo']), count => console.log(count);
// createTag({ name: 'Fitness' }, newTag => console.log('Nuovo tag inserito: ', newTag));

const express = require("express");
require("dotenv").config();
const { PORT } = process.env;
const port = PORT || 3000;
const postsRouter = require("./routers/posts.js")
const notFound = require("./middlewares/notFound.js")
const errorHandler = require("./middlewares/errorHandler.js")

const app = express();
app.use(express.json());

app.use('/posts', postsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server in ascolto su http://localhost:${port}`));