const express = require("express");
const app = new express.Router();
const User = require('../model/user.model')
const service = require('../service/imageToBinary.service')
app.get('/', (req, res) => {
    //res.sendStatus(400).send("Hello World")
    res.render("index");
})



app.get('/browse', (req, res) => {
    //res.sendStatus(400).send("Hello World")
    res.render("browse");
})

app.post('/', async (req, res) => {
    console.log("Incoming Post")
    try {
        const coverImageData = service.saveCover(req.body.coverImage)
        const user = new User(coverImageData)
        await user.save()
        res.redirect('/')
    } catch (e) {
        res.send(e).status(404)
    }
})

app.get('/images', async (req, res) => {
    try {
        console.log("Browsing Images")
        const images = await User.find()
        const imagesArray = []
        console.log(images.length); images.forEach(image => {
            console.log(image.coverImageType)
            if (image.coverImage == null && image.coverImageType == null) {
                imagesArray.push(image);
                return;
            }
            return imagesArray.push(`data:${image.coverImageType};charset=utf-8;base64,${image.coverImage.toString('base64')}`);
        })
        console.log(imagesArray.length)
        res.send(imagesArray)
    } catch (e) {
        console.log(e)
        res.send(e).status(404)
    }
})

/* function saveCover(coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        coverImage = new Buffer.from(cover.data, 'base64')
        coverImageType = cover.type
        return { coverImage, coverImageType }
    }
} */


module.exports = app;
