const router = require('express').Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');

//REGISTER ROUTE
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser); 
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("wrong credentials!");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("wrong credentials!");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE USER 
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log("Data yang dikirim:", req.body);

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_KEY
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        console.log("Data yang diperbarui:", updatedUser);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json("Data pengguna tidak ditemukan");
        }
    } catch (err) {
        console.error("Kesalahan:", err);
        res.status(500).json(err);
    }
});

// SHOW ALL USER 
router.get("/", verifyToken, async (req, res) => {
    try {
        // Mengambil semua data user dari database
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (err) {
        console.error("Kesalahan:", err);
        res.status(500).json(err);
    }
});


// UNTUK MELIHAT USER BY ID
router.get("/data/:id", verifyTokenAndAuthorization, (req, res) => {
    // Jika middleware berhasil diverifikasi, kita dapat mengakses req.user
    res.json({
        userId: req.user.id,
        isAdmin: req.user.isAdmin,
        data: "Data yang diakses oleh pengguna yang memiliki hak akses",
    });
});

module.exports = router;