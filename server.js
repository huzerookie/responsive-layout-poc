const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
require('./config/config')
const path = require("path");
const hbs = require("hbs");
const bodyParser = require('body-parser')
const viewsPath = path.join(__dirname, "./views");

const imageRoute = require("./router/image.route");
const formRoute = require('./router/form.route')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
//Setup Handlerbars engine and view location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(viewsPath);
app.use(express.static(viewsPath));
//app.use('/image', imageRoute)
app.use('/form', formRoute)


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
