module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.customMessage || 'Server Error';
    res.status(statusCode).send(err.message)
}