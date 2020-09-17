const express = require('express');
const auth = require('../middleware/auth');
const profiles = require('../models/profiles');
const users = require('../models/users');
const router = express.Router()


// @Get profiles
// @Public
router.get('/', async (req, res) => {
    try {
        const profile = await profiles.find()
        res.send(profile)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await profiles.findOne({ user: req.user.id })
        if (!profile) {
            return res.status(400).send("this user dosent have profile")
        }
        res.send(profile)
    } catch (error) {
        res.status(401).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const profile = await profiles.findOne({ user: req.params.id })
        res.send(profile)
    } catch (error) {
        res.status(404).send('user not found')
    }
})

router.post("/me", auth, async (req, res) => {
    try {
        const userProfile = await profiles.findOne({ user: req.user.id })
        if (userProfile) {
            await userProfile.updateOne(req.body)
            await userProfile.save()
            return res.send(userProfile)
        }

        const profile = new profiles(req.body)
        profile.user = req.user.id
        profile.skills = req.body.skills.split(",")
        profile.save()
        res.send(profile)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        const profile = await profiles.findOne({ user: req.user.id })
        if (!profile) {
            return res.send("u already dosent have profile")
        }
        await profile.remove()
        res.send("profile removed")
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router