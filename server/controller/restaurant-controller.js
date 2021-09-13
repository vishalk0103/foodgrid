const Restaurant=require('../model/restaurants')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({
    accessToken:
      "pk.eyJ1IjoidmlzaGFsNzg5OSIsImEiOiJja3Q4YmVtZWkxMHFtMm9sYXlsMDIybHVwIn0.wlqyFdeNAF2RXZ1rv8CEJA",
  });

const getRestaurants=async(req,res)=>{
    const restaurants= await Restaurant.find()
    res.json({restaurants: restaurants.map(restaurant=>restaurant.toObject())})
}


const getRestaurantByLocation=async(req,res)=>{
    const location=req.params.location;
    const restaurants= await Restaurant.find({location})
    res.json({restaurants: restaurants.map(restaurant=>restaurant.toObject())})
}
const createRestaurant=async (req, res) =>{
    const {name,location,description,deliveryFee,address,image,foods,coordinates}=req.body;
    const geoData = await geocoder
    .forwardGeocode({
      query: req.body.address,
      limit: 1,
    })
    .send();
    const newRestaurant= new Restaurant({
        name,
        description,
        location,
        deliveryFee,
        image,
        foods,
        address,
        coordinate:coordinates
    })
    newRestaurant.coordinate =geoData.body.features[0].geometry
    try{
    await newRestaurant.save()
    }catch(err){
        console.log(err)
    }
    res.status(201).json({ newRestaurant });
}

exports.getRestaurants= getRestaurants;
exports.getRestaurantByLocation=getRestaurantByLocation
exports.createRestaurant=createRestaurant;