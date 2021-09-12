const express=require('express')

const router=express.Router()

const addressController=require('../controller/address-controller')

router.post('/',addressController.createAddress)
router.get('/:userId',addressController.getAddressById)
router.delete('/:aId',addressController.deleteAddress)

module.exports=router;