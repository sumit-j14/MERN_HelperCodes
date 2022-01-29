const express = require('express')
const path = require('path')
const ejs = require('ejs')
const multer = require('multer')
const { execPath } = require('process')
const app = express()
const port = 3000
app.set('view engine','ejs')

//set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        //generate your own imgage name
      image_name= file.fieldname + '-' + Date.now()+path.extname(file.originalname) 
      cb(null, image_name )
    }   
  })
  //initialize upload variable
  const upload = multer({
       storage: storage
       //below line for limiting the size of image
       ,limits:{fileSize:1000000}
       ,fileFilter:function (req,file,cb) {
           //defined below checkFiletype
           checkFileType(file,cb)
       }
     }).single('myImage');//provided in ejs form
   
     //defined checkFileType function
     // Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime (media)
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
        console.log("filetype notmatch");
      cb('Error: Images Only!');
    }
  }

app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.render('index')
})

//upload api call on image upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {
          res.render('index', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})