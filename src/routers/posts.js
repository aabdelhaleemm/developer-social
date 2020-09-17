const express = require('express');
const posts = require('../models/posts');
const auth = require('../middleware/auth');
const { route } = require('./profiles');
const router = express.Router()

// Posts routes 
router.get('/', async (req, res) => {
    try {
        const post = await posts.find().sort({ date: -1 })
        res.json(post)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await posts.findById(req.params.id)
        if (!post) {
            return res.status(404).send('post not found !')
        }
        res.json(post)
    } catch (error) {
        res.status(404).send("uesr not found")
    }
})
router.post('/add', auth, async (req, res) => {
    try {
        const p = {
            ...req.body,
            user: req.user.id
        }
        const post = new posts(p)
        post.save()
        res.send(post)
    } catch (error) {
        res.status(404).send(error)
    }
})
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await posts.findById(req.params.id)
        if (post.user != req.user.id) {
            return res.status(401).send('unauthraized !')
        }
        res.json(post)
    } catch (error) {
        res.status(404).send("uesr not found")
    }
})


// Like and Unlike route 
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await posts.findById(req.params.id)

        const liked = post.likes.includes(req.user.id)
        if (liked) {
            return res.status(400).send('u already liked the post')
        }
        post.likes.unshift(req.user.id)
        await post.save()
        res.send('done')
    } catch (error) {
        res.status(404).send('no such a post')
    }
})
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await posts.findById(req.params.id)
        const liked = post.likes.includes(req.user.id)
        if (!liked) {
            return res.status(400).send('u already dosent like the post')
        }
        post.likes = post.likes.filter(el => el != req.user.id)
        await post.save()
        res.send('done')
    } catch (error) {
        res.status(404).send('no such a post')
    }
})

// Comment routes
router.put('/comment/:id',auth,async(req,res)=>{
    try {
        const post = await posts.findById(req.params.id)
        const comment= {
            user : req.user.id,
            text:req.body.text
        }
        post.comments.unshift(comment)
        await post.save()
        res.send(post)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/comment/:id/:comment',auth,async(req,res)=>{
    try {
        const post = await posts.findById(req.params.id)
        const index =post.comments.findIndex(el => el.id == req.params.comment)
        console.log(index);
        if (post.comments[index].user == req.user.id){
            post.comments.splice(index,1)
            await post.save()
            return res.send(post)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router