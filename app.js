const express = require("express");
const app = express();
const body = require("body-parser");
const bodyParser = require("body-parser");
const path = require('path');
const fileUpload = require("express-fileupload")
const fs = require('fs');
const requestIp = require('request-ip');
const mongose = require("mongoose")
app.use( express.static( "public" ) );


const PORT = process.env.PORT || 2000



mongose.connect(process.env.MONGODB_URI || "mongodb+srv://F@cluster0.p7i88.mongodb.net/1?retryWrites=true&w=majority" , { 
    useNewUrlParser: true ,
    useUnifiedTopology: true 



} )

var db = mongose.connection

var schema =  new mongose.Schema({

    title:String,
    creator:String,
    cssp:String,
    img:String,

   

}) 

var css = mongose.model("css" , schema);


app.use(fileUpload({
    
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),

}));
app.set("view engine", "ejs");


app.get("/",function(req,res){
res.render("homepage.ejs")
});


app.get("/list", function (req, res) {   
    css.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("2.ejs", { details: allDetails })
        }
    })
    })
    
    
    


app.get("/add",function(req , res){
res.render("add.ejs")
})






app.post("/add", function(req, res){

    var  data = req.body; 
   



    console.log(data)


   

    //professor rework time 
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).send('No files were uploaded.');
    }



let targetFile = req.files.target_file;
let extName = path.extname(targetFile.name);
let png = req.files.target_png;
let extName2 = path.extname(png.name)

let cum  = ['.css','.html'];


let FUCK_YOU = ['.jpg' , '.png']

if(!cum.includes(extName)){
    fs.unlinkSync(targetFile.tempFilePath);
    return res.status(422).send("This aint Code are you trying to spread virusses kid ?");
}



targetFile.mv(path.join(__dirname, '/public/uploads', targetFile.name) ,(err) => {
    


    if(err)
    return res.status(500).send(err);
    res.render("1.ejs")

})

png.mv(path.join(__dirname, '/public/PNG', png.name), err => {


    css.create({

        title:data.title,
        creator:data.creator,
        cssp:path.join('/uploads/',targetFile.name),
        img:path.join('/PNG/', png.name),
    

    })

})

})





app.listen(PORT,function(){
console.log(`I HATE U , I THINK U SHOULD DIE NGL I WILL HELP U WITH THAT IF U WANT ${PORT}`)    
})