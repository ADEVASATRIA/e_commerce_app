const express = require('express');
const router = require('express').Router();
const Product = require('../models/Product');

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken');


// CREATE NEW PRODUCTS  (Using Middleware verifyTokenAndAdmin)
// router.post('/', verifyTokenAndAuthorization, async (req, res) => {
//     const newProduct = new Product(req.body);

//     try {
//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// CREATE NEW PRODUCTS  not using Middleware
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL PRODUCTS not using Middleware
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET DATA PRODUCT BY ID not using Middleware
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE PRODUCT BY ID not using Middleware
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE PRODUCT BY ID not using Middleware
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;