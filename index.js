// express
const express = require('express')
var xss = require('xss-clean')
const { response } = require("./src/middleware/common");
const helmet = require('helmet')
const cors = require("cors")
require("dotenv").config();
var bodyParser = require('body-parser')
const morgan = require("morgan")
const app = express()
const mainRouter = require("./src/routes/index")
app.use("/img", express.static('./upload'))
// xss-clean

app.use(xss())
app.listen(8080)

// morgan

app.use(morgan("dev"))

// bodyParser

app.use(bodyParser.json())

// cors

app.use(cors())

// helmet

app.use(helmet())

// response
app.use("/", mainRouter)
app.all("*",(req,res,next) => {
  response(res,404,false,null,"404 Not Found")
})
app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

console.log(process.env.DB_PASS)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
