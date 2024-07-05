const express = require('express')
const router = express.Router()


const getAllProductsController = require('../controller/getAllProducts')

const addOrderController = require('../controller/addOrder')



router.route('/products/all').get((req, res) => { getAllProductsController.getAllProducts(req,res)})
router.route('/products/:product_id').get((req, res) => { getAllProductsController.getSpecificProduct(req,res)})

router.route('/products/:product_id/order').post((req, res) => { addOrderController(req,res)})

module.exports = router;