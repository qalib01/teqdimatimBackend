const originCheck = (req, res, next) => {
    const allowedOrigins = ['https://teqdimatim.az', 'http://localhost:3000'];
    const origin = req.headers.origin;
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']; // Add the allowed methods

    if (allowedOrigins.includes(origin) && allowedMethods.includes(req.method)) {
        // Allow requests from the allowed origins
        next();
    } else {
        // Reject requests from other origins
        res.status(403).json('Bu API istifadə etmək hüququnuz yoxdur. Xahiş olunur ki, bir daha yoxlamayasınız!');
    }
};

module.exports = { originCheck };