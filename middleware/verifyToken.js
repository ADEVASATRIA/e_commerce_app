const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Token tidak valid!" });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ error: "Anda tidak terautentikasi!" });
    }
};

// Middleware For check token dan permission
const verifyTokenAndAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error("Token tidak valid:", err);
                return res.status(403).json("Token tidak valid!");
            }

            if (user.id === req.params.id || user.isAdmin) {
                req.user = user;
                next();
            } else {
                res.status(403).json("Anda tidak diizinkan untuk melakukan ini!");
            }
        });
    } else {
        console.error("Token tidak diberikan");
        return res.status(401).json("Anda tidak terautentikasi!");
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return res.status(403).json("Anda tidak diizinkan untuk melakukan ini!");
        }

        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Anda tidak diizinkan untuk melakukan ini!");
        }
    });
};


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};