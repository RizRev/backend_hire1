const express = require('express')
const router = express.Router()
const {ProductController} = require('../controller/products')
const { protect } = require('../middleware/auth')
const {upload} = require('../middleware/upload')

router.post('/',upload,protect, ProductController.insert)
router.delete('/:id', ProductController.delete)
router.get('/:id',ProductController.getProductDetail)
router.get('/', ProductController.getProduct)
router.put('/:id',upload, ProductController.update)



module.exports = router
