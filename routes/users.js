var express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

var router = express.Router();

// User Registration
router.post("/register", async(req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) res.status(401).send("Username is taken");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
});

// User Login
router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).send("User not found");
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, "secretkey");
        res.status(200).send({ token });
    } else {
        res.status(401).send("Invalid password");
    }
});

module.exports = router;
module.exports = router;