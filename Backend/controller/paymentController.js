const shortid = require('shortid');
const Payment = require('../models/payment');
const nodemailer = require("nodemailer");


exports.createPayment = (req, res) => {

    const {
        name, email, date, cardnumber, cvc, amount
    } = req.body;

    const payment = new Payment({

        name,
        email,
        date,
        cardnumber,
        cvc,
        amount

    });


    payment.save(((error, Booking) => {
        if (error) {
            console.log(email);
            const receiverEmail = email; // get the reciver email address from body of the  request
            const senderMail = "edexonlineconferencemanagement@gmail.com"; // set emailmaddress of sender
            const password = "asdqwe@123"; // set password of sender

            try {
                /*
               create reusable transporter object using the default SMTP transport
              */
                let transporter = nodemailer.createTransport({
                    service: "gmail", // use gmail as the email service
                    port: 25, // port number
                    secure: false, // true for 465, false for other ports
                    auth: {
                        // autnetication details
                        user: senderMail,
                        pass: password,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                let HelperOptions = {
                    from: senderMail, // sender address
                    to: receiverEmail, // list of receivers
                    subject: "Your payement successfuly", // Subject line
                    text: "", // plain text body
                    html: ` 
                      <h3>This is an automatically generated email, please do not reply </h3>
                      <h3>Paid </h3>
                      <li>status: Successuly  </li>
                      <li>Name: ${name}</li>
                      <li>Date: ${date}</li>
                      <li>amount: ${amount}</li>
                          
                      <h3>Thank You!</h3>
                      <p>Express</p>`,
                };

                // HTML version of the message

                transporter.sendMail(HelperOptions, (error, info) => {
                    // send mail with defined transport object
                    if (error) {
                        return console.log(error);
                    }

                    console.log("The message was sent!");

                    console.log(info);

                    res.json(info); // send the json response
                });
            } catch (e) {
                console.log(e);
            }
        }
        if (Booking) {
            res.status(201).json({ Booking });
            console.log(email);
            const receiverEmail = email; // get the reciver email address from body of the  request
            const senderMail = "edexonlineconferencemanagement@gmail.com"; // set emailmaddress of sender
            const password = "asdqwe@123"; // set password of sender

            try {
                /*
               create reusable transporter object using the default SMTP transport
              */
                let transporter = nodemailer.createTransport({
                    service: "gmail", // use gmail as the email service
                    port: 25, // port number
                    secure: false, // true for 465, false for other ports
                    auth: {
                        // autnetication details
                        user: senderMail,
                        pass: password,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                let HelperOptions = {
                    from: senderMail, // sender address
                    to: receiverEmail, // list of receivers
                    subject: "Your payement successfuly", // Subject line
                    text: "", // plain text body
                    html: ` 
                <h3>This is an automatically generated email, please do not reply </h3>
                <h3>Paid </h3>
                <li>status: Successuly  </li>
                <li>Name: ${name}</li>
                <li>Date: ${date}</li>
                <li>amount: ${amount}</li>
                      
                <h3>Thank You!</h3>
                <p>Express</p>`,
                };

                // HTML version of the message   
                transporter.sendMail(HelperOptions, (error, info) => {
                    // send mail with defined transport object
                    if (error) {
                        return console.log(error);
                    }

                    res.json(info); // send the json response
                });
            } catch (e) {
                console.log(e);
            }
        }
    }));
}

exports.getall = async (req, res) => {
    await Payment.find({})
        .then(data => {
            res.status(200).send({ data: data });

        }).catch(err => {
            res.status(500).send({ error: err.massage })
            console.log("err");
        });

}


exports.getPayment = (req, res) => {
    Payment.find({}).exec((error, Payment) => {
        if (error) return res.status(400).json({ error });
        if (Payment) {
            const payment = this.createPayment(Payment)
            return res.status(201).json({ payment });
        }
    });
}

exports.updatePayment = (req, res) => {

    const {

        name,
        email,
        date,
        cardnumber,
        cvc,
        amount
    } = req.body;

    console.log(" id", req.params._id)

    Payment.findByIdAndUpdate(req.params._id, { $set: { name: name, email: email, cardnumber: cardnumber, cvc: cvc, amount: amount, date: date } },
        { new: true })
        .catch((err) => {
            console.log(err);
        })
}

exports.deleteById = (req, res) => {
    const { nic } = req.params._id;
    console.log(req.params._id)
    if (req.params._id) {
        Payment.deleteOne({ _id: req.params._id }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};













