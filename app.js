const express =require("express")
const https = require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query = req.body.city;
    const api = "75df44027b49b7d661788c3bee3e3723";
    const unit = "metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+api;
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const imgURL="http://openweathermap.org/img/wn/@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather description: "+weatherDescription+"</p>")
            res.write("<h1>The temperature in "+req.body.city+" is " +temp+ " degree Celsius</h1>")
            res.send();
        })
    })
    
    
})










app.listen(3000,function(){
    console.log("You're listening to server 3000")})