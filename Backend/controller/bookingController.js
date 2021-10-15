const Booking = require('../models/booking');
const nodemailer = require("nodemailer");

exports.createBooking = (req,res) => {

    const {
        nic,phone,startingPoint,endingPoint,time,date,quantity
    } = req.body;
  
    const booking = new Booking({
        nic,
        phone,
        startingPoint,
        endingPoint,
        time,
        date,
        quantity
    });
   
    booking.save(((error, Booking)=> { 
        if (error) return res.status(201).json({ error });
       
        if (Booking) {
            res.status(201).json({ Booking });
            console.log("save");
        }
    }));  
 
}


exports.getall=async(req,res)=>{
    await Booking.find({})
    .then(data=>{
       res.status(200).send({data:data});
       
   }).catch(err=>{
       res.status(500).send({error:err.massage})
       console.log("err");
   });
       
   }

   exports.getbooking = (req, res) => {
    Booking.find({}).exec((error, Booking) => {
        if (error) return res.status(400).json({ error });
        if (Booking) {
            const booklist = createBooking(Booking)
            return res.status(201).json({ booklist });
        }
    });
}

exports.updatebooking = (req, res) => {

    const {
        nic,
        phone,
        startingPoint,
        endingPoint,
        time,
        date,
        quantity
    } = req.body;
  
    console.log(" id", req.params._id)

    Booking.findByIdAndUpdate(req.params._id, { $set: {  time:time ,nic: nic,startingPoint:startingPoint, endingPoint:endingPoint, phone: phone, date:date, quantity:quantity} },
        { new: true })
        .catch((err) => {
            console.log(err);
        })
}

exports.deleteById = (req, res) => {
    const { nic } = req.params._id;
    console.log(req.params._id)
    if (req.params._id) {
        Booking.deleteOne({ _id: req.params._id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    } else {
      res.status(400).json({ error: "Params required" });
    }
  };

  exports.getbookingbyid=async(req,res)=>{
    if(req.params && req.params.nic){
        console.log(req.params.Booking)

        await  Booking.findById(req.params.nic)
        .then(data => {
            console.log(data);
           res.status(200).send({ data: data });
        
       }).catch(err=>{
           res.status(400).send({error:err.massage})
       });
    }
    
  };

  exports.getbookingbynic=async(req,res)=>{
    const nic= req.body.nic;
        await  Booking.findOne({nic:nic})
        .then(data => {
            console.log(data);
           res.status(200).send({ data: data });
           
       }).catch(err=>{
           res.status(400).send({error:err.massage})
       });
    
    
  }