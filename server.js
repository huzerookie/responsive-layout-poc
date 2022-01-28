const express = require('express')
const app = express()
require('./config/config')
const User = require('./model/user.model')
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require('fs')
const bodyParser = require('body-parser')
const viewsPath = path.join(__dirname, "./views");
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
//Setup Handlerbars engine and view location
app.set("views", viewsPath);
app.use(express.static(viewsPath));

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
        const coverImageData = saveCover(req.body.coverImage)
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
        res.send(images)
    } catch (e) {
        res.send(e).status(404)
    }
})

function saveCover(coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        coverImage = new Buffer.from(cover.data, 'base64')
        coverImageType = cover.type
        return { coverImage, coverImageType }
    }
}
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
