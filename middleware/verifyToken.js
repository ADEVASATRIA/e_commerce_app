const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const express = require('express');
const app = express();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // Tangani token tidak valid atau gagal diverifikasi
                return res.status(403).json({ error: "Token tidak valid!" });
            }

            req.user = user; // Tetapkan objek user yang berhasil diverifikasi ke req.user
            next();
        });
    } else {
        // Tangani kasus ketika token tidak diberikan
        return res.status(401).json({ error: "Anda tidak terautentikasi!" });
    }
};

// Middleware For check token dan permission
const verifyTokenAndAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            console.error("Token tidak valid:", err);
            return res.status(403).json("Token tidak valid!");
        }

        console.log("User yang berhasil diverifikasi:", user);
        if (user.id === req.params.id || user.isAdmin) {
            req.user = user; // Tetapkan objek user yang berhasil diverifikasi ke req.user
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


module.exports = {verifyToken, verifyTokenAndAuthorization};