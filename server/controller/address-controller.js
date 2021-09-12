const Address = require("../model/addresss");
const User = require("../model/user");
const mongoose = require("mongoose");

const createAddress = async (req, res) => {
  const { address, flatNo, city, landmark, pincode, user } = req.body;
  const newAddress = new Address({
    address,
    flatNo,
    city,
    landmark,
    pincode,
    user,
  });
  let findUser;
  try {
    findUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!findUser) {
    return res.json({ message: "cound no find user" });
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newAddress.save({ session: sess });
    findUser.address.push(newAddress);
    await findUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  res.json({ newAddress });
};

const getAddressById = async (req, res) => {
  const userId = req.params.userId;
  if(!userId){
      return;
  }
  let userwithaddress;

  try {
    userwithaddress = await User.findById(userId).populate("address");
  } catch (err) {
    console.log(err);
  }
  if(!userwithaddress){
      return;
  }
  res.json({
    addresses: userwithaddress.address});
};

const deleteAddress = async (req, res) => {
  const aId = req.params.aId;
  const address = await Address.findById(aId).populate('user');
  try{
    const sess= await mongoose.startSession();
    sess.startTransaction()
    await address.remove({session:sess})
    address.user.address.pull(address)
    await address.user.save({session:sess})
    await sess.commitTransaction()
 
  }catch(err){
    console.log(err)
  }
  res.json({ message: "delete successfully" });
};

exports.createAddress = createAddress;
exports.getAddressById = getAddressById;
exports.deleteAddress = deleteAddress;
