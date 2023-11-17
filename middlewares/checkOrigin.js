const originCheck = (req, res, next) => {
    const allowedOrigins = ['https://teqdimatim.az', 'http://localhost:3000'];
    console.log(req.headers.origin);
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // Allow requests from the allowed origins
        next();
    } else {
        // Reject requests from other origins
        res.status(403).json('Bu API istifadə etmək hüququnuz yoxdur. Xahiş olunur ki, bir daha yoxlamayasınız!');
    }
};

module.exports = { originCheck };