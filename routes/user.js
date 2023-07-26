const router = require('express').Router();

router.get("/usertest",(req,res) => {
    res.send("User Test is Successfull")
});

router.post("/userposttest",(req,res) => {
    const username = req.body.username;
    // console.log(username);
    res.send("Your Username is : " + username)
});

module.exports = router;