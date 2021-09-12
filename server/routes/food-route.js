const express= require('express')
const router= express.Router()

const foodController= require('../controller/food-controller')

router.post('/',foodController.createFood)
router.get('/restaurant/:rId',foodController.getFoodByRestaurantId)

module.exports= router