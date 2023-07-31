const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
// const User = require('../models/User');



// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//     console.log("Data yang dikirim:", req.body);

//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASS_KEY
//         ).toString();
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set: req.body,
//         },
//         { new: true }
//         );
//         console.log("Data yang diperbarui:", updatedUser);
//         if (updatedUser) {
//             res.status(200).json(updatedUser);
//         } else {
//             res.status(404).json("Data pengguna tidak ditemukan");
//         }
//     } catch (err) {
//         console.error("Kesalahan:", err);
//         res.status(500).json(err);
//     }
// });

// Endpoint untuk mengambil data semua user
// router.get("/", verifyToken, async (req, res) => {
//     try {
//         // Mengambil semua data user dari database
//         const Users = await User.find();
//         res.status(200).json(Users);
//     } catch (err) {
//         console.error("Kesalahan:", err);
//         res.status(500).json(err);
//     }
// });

// UNTUK MELIHAT USER 
// router.get("/data/:id", verifyTokenAndAuthorization, (req, res) => {
//     // Jika middleware berhasil diverifikasi, kita dapat mengakses req.user
//     res.json({
//         userId: req.user.id,
//         isAdmin: req.user.isAdmin,
//         data: "Data yang diakses oleh pengguna yang memiliki hak akses",
//     });
// });

module.exports = router;

