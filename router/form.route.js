require('dotenv').config()
const mongooseURL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL
const express = require("express");
const path = require('path');
const app = new express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const Form = require('../model/form.model')
const service = require('../service/imageToBinary.service')
const userMapper = require('../service/form.service').userMapper

//DB Connection
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    // Init stream   
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongooseURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });


app.get('/', (req, res) => {
    res.render('index-form')
})

app.get('/:userId', async (req, res) => {
    try {
        const user = await Form.findById(mongoose.Types.ObjectId(req.params.userId))
        if (!user) throw new Error('No user found')
        const filename = user.image
        gfs.files.findOne({ filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            if (file.contentType === 'image/jpg' || file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                res.render('show-user', { user, file })

            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        });
    } catch (e) {
        res.send(e).status(404)
    }
});

app.post('/', upload.single('userImage'), async (req, res) => {
    try {
        const user = userMapper(req.body);
        user.image = req.file.filename
        const userObj = new Form(user)
        const savedUser = await userObj.save()
        res.redirect(`/form/${userObj._id}`)
    } catch (e) {
        res.send(e).status(404)
    }
})

app.get('/image/:filename', (req, res) => {
    try {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            if (file.contentType === 'image/jpg' || file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        });
    } catch (e) {
        res.send(e).status(404)
    }
});

module.exports = app