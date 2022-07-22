const express = require("express");
const https = require("https");
const bodyParse = require("body-parser");
const app = express();

app.use(bodyParse.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
        })

  app.post("/",function(req,res){
    
    const cityName=req.body.city ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=87cd5268196bad2714c8c191b3a62286&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const weatherFeel = weatherData.weather[0].description;
            const temp = weatherData.main.temp ;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>"+`The temperature in ${cityName} is ${temp} C`+"</h1>")
            res.write("<p><h2>The weather is currently "+weatherFeel+"</h2></p>")
            res.write("<img src="+imgUrl+">");
            res.send();
  })      
    })
    // res.send("running")
})




app.listen(2000,function(){
    console.log("running on route 2000");
})