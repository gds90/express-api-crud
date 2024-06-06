const {
    createCategory,
    createCategories
} = require('./utils/crud-category.js');

const {
    createTag,
    createTags
} = require('./utils/crud-tag.js');

const { createPost,
    readPostBySlug,
    readAllPosts,
    updatePost,
    deletePost,
    readPublishedPosts,
    readPostsByContent
} = require('./utils/crud-post.js');

// Creazione post
// createPost({
//     title: 'Lasagne al forno',
//     slug: 'lasagne-al-forno',
//     image: 'https://photo/lasagne-al-forno',
//     content: 'Un piatto ideale da gustare in famiglia',
//     published: true,
//     tags: {
//         connect: [
//             { id: 1 },
//         ]
//     },
//     category: {
//         connect: { id: 3 },
//     }
// }, newPost => console.log(newPost));

// Lettura post tramite slug 
// readPostBySlug('post-di-prova-4', post => console.log(post));

// Lettura di tutti i post 
// readAllPosts(posts => console.log(posts));

// Aggiornamento di un post (aggiunta di categoria e tags)
// updatePost('post-di-prova-3', {
//     category: {
//         set: [
//             { id: 1 }
//         ]
//     },
//     tags: {
//         set: [
//             { id: 2 }
//         ]
//     }
// }, updatedPost => console.log('Post aggiornato correttamente: ', updatedPost));

// ELiminazione di un post
// deletePost('post-di-prova-3');

// BONUS: funzione che restituisca solo i Post pubblicati
// readPublishedPosts(posts => console.log(posts));

// BONUS: funzione che restituisca solo i Post che contengono una determinata stringa nel contenuto.
readPostsByContent('ideale', posts => console.log(posts));

// Creazione categorie
// createCategories(['Cucina', 'Sport', 'Tecnologia'], count => console.log(count));
// createCategory({ name: 'Musica' }, newCategory => console.log('Nuova categoria inserita: ', newCategory));

// Creazione tag
// createTags(['Pasta', 'Torta', 'Gelato', 'Calcio', 'Basket', 'Tennis', 'Pallavolo', 'Smartphone', 'Computer', 'Programmazione', 'Concerto', 'Spettacolo']), count => console.log(count);
// createTag({ name: 'Fitness' }, newTag => console.log('Nuovo tag inserito: ', newTag));