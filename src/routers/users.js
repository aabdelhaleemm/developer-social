const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const users = require("../models/users")
const profiles = require('../models/profiles')

const router = express.Router()


router.get("/", (req, res) => {
    res.send("user route")
})

router.post("/register", async (req, res) => {
    try {
        const user = new users(req.body)
        user.password = await bcrypt.hash(req.body.password, 8)
        await user.save()
        const token = await jwt.sign(user.id, process.env.jwtToken)
        res.status(200).send({ name: user.name, token })
    }
    catch (error) {
        if (error.keyPattern.email) {
            return res.status(400).send("email already exist!")
        }
        res.status(400).send(error)
    }
})
router.post("/login", async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json('invalid email or password')
        }
        const userpass = await bcrypt.compare(req.body.password, user.password)
        if (!userpass) {
            return res.status(404).send('invalid email or password')
        }
        const token = jwt.sign(user.id, process.env.jwtToken)
        res.send({ token, name: user.name })
    } catch (error) {
        res.status(404).send(error)
    }
})


router.delete('/me', auth, async (req, res) => {
    try {
        const profile = await profiles.findOne({ user: req.user.id })
        if (profile) {
            await profile.remove()
        }
        await req.user.remove()
        res.send("Done i hope we see u again !")
    } catch (error) {
        res.status(404).send(error)
    }
})
module.exports = router