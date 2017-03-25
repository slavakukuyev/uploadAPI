var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var Vibrant = require('node-vibrant');

var dest = './uploads';
var fileName = "";


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {


        callback(null, dest);
    },
    filename: function (req, file, callback) {
        fileName = file.fieldname + '-' + Date.now();
        callback(null, fileName);
    }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

        Vibrant.from(dest+ "/" + fileName).getPalette(function(err, palette) {
            if(err){
                return res.send(err);
            }

            return res.send(palette);
        })
    });
});

app.listen(3001,function(){
    console.log("Working on port 3001");
});