const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/" , function(req,res){
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey ="fbe4cbb23837ff72b9797dcd08e27d31";
    const unit  = "metric"; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" +unit+ "&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            // console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather description is :" + weatherDescription +" </p>");
            res.write("<h1>The temp in " + query +" is:" + temp + " degrees Celcius. </h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send( );
        });
    });
    // res.send("success");
});

    // res.send("server is up");




app.listen(3000,function(){
    console.log("Server has started on port 3000");
});
