const router = require('express').Router();
const User = require("../Models/User");


//REGISTER ROUTE
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser); 
    } catch (error) {
        res.status(500).json({message: error});
    }
});


module.exports = router;