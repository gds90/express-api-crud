module.exports = (err, req, res, next) => {
    res.status(404).send({ message: 'Pagina non trovata' });
}