const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation")



router.post("/register", async (req, res) => {

    //lets validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check whether user is already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email already existed");

    // hash password
    const salt = await bcrpyt.genSalt(10);
    const hashedPassword = await bcrpyt.hash(req.body.password, salt);

    try {
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }).save()
        res.send(user);
    }
    catch (err) {
        res.send(err);
    }
});

//lets validate the data


router.post("/login", async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //check whether user is already in database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("email or password is wrong");

    //passsword validation
    const validPass = await bcrpyt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("password invalid");


    //create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;