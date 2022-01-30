//first of all turn on less secure access in gmail settings for sender

const express = require('express')
const app = express()
const port = 3000
const path = require('path')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const nodemailer = require("nodemailer");
console.log("test");
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

app.post('/mail',urlencodedParser, (req, res) => {
    var message=req.body.name;
    var recepient=req.body.recepient;
    console.log(message);
    console.log(recepient);
    //this message is sent to email
    //main helper code here

    //this is for sender details
    var transporter = nodemailer.createTransport({
        //@mail service of sender
        //gmail for gmail
        service: 'gmail',
        auth: {
            //type user name and password
          user: 'YOUR EMAIL',
          pass: 'PASSWORD'
        }
      });
      
      var mailOptions = {
          //sender to from etc..
        from: 'YOUR EMAIL',
        to: 'RECEPIENT',
        subject: 'Sending Email using Node.js',
        //this is your message
        //here we have got this from the html tag input
        text: message
      };
      
      //call this function to send mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
        //mail sent 
    res.sendFile(__dirname+'/index.html')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})