const router=require("express").Router();
const {createBus, getall, updatebus, deleteById, getbusbyplatenumber}=require('../controller/busController') 



 
console.log("1");
router.post('/bus/createbus',createBus);
router.get('/bus/viewbuses',getall);
router.put('/bus/edit/:_id',updatebus);
router.delete('/bus/del/:_id',deleteById);
router.post('/bus/sech',getbusbyplatenumber);


 module.exports = router;  