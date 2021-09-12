const Food = require("../model/foods");
const Restaurant = require("../model/restaurants");
const mongoose = require("mongoose");

const createFood = async (req, res) => {
  const { title, image, price, category, type, restaurant } = req.body;
  const newFood = new Food({
    title,
    image,

    price,
    category,
    type,
    restaurant,
  });
  let rest;
  try {
    rest = await Restaurant.findById(restaurant);
  } catch (err) {
    console.log(err);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newFood.save({ session: sess });
    rest.foods.push(newFood);
    await rest.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  res.json({ newFood });
};

const getFoodByRestaurantId = async (req, res) => {
  const rId = req.params.rId;
  let foodWithResId;
  try {
    let rests = await Restaurant.findById(rId);
    foodWithResId = await Restaurant.findById(rId).populate("foods");
  } catch (err) {
    console.log(err);
  }

  res.json({
    foods: foodWithResId.foods.map((food) => food.toObject({ getters: true })),
    rest: foodWithResId,
  });
};

exports.createFood = createFood;
exports.getFoodByRestaurantId = getFoodByRestaurantId;
