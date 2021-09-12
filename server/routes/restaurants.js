const express= require('express')
const router= express.Router()

const restaurantController= require('../controller/restaurant-controller')

router.get('/',restaurantController.getRestaurants)
router.get('/location/:location',restaurantController.getRestaurantByLocation)
router.post('/',restaurantController.createRestaurant)

module.exports= router