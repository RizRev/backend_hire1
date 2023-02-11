const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const UsersRouter = require('../routes/users')

router
.use('/products', ProductRouter)
.use('/users',UsersRouter)

module.exports = router