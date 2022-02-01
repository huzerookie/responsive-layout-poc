const mongoose = require('mongoose')
const Grid = require('gridfs-stream');
require('dotenv').config()
const mongooseURL = /* process.env.DATABASE_URL || */ process.env.LOCAL_DATABASE_URL
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async (connection) => {
    console.log(mongooseURL)
    console.log("connection successful");
}).catch((e) => {
    console.log(e);
});
//const conn = mongoose.createConnection(mongooseURL);

// Init gfs

