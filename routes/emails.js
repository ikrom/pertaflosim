var express = require('express');
var nodeMailer = require('nodemailer');
var router = express.Router();
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('email', { title: 'Express' });
});

router.post('/', function (req, res,next) {
  var transporter = nodeMailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  }));

  let subject = "Ask_Pertaflosim_"+req.body.name +" ("+ req.body.email +")_"+ req.body.company
  let content = `Nama: ${req.body.name}<br>Email: ${req.body.email}<br>Perusahaan: ${req.body.company}<br><br>${req.body.message}
  `
  let mailOptions = {
    // should be replaced with real recipient's account
    from: 'pertaflosim@gmail.com',
  	to: 'pertaflosim@gmail.com',
   	subject: subject,
   	// body: req.body.message
    html : content
  };

	transporter.sendMail(mailOptions, (err, info) => {
   	if (err) {
      return res.json({ err: err });
     	// return console.log(error);
   	}
   	// console.log('Message %s sent: %s', info.messageId, info.response);
    return res.json({ success: true });
  });
  // res.writeHead(301, { Location: 'email' });
  // res.end();
});

module.exports = router;
