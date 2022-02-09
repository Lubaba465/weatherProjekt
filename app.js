const express= require('express');
const https=require("https");
const {response} = require("express");
const bodyParser=require('body-parser');
const ejs = require("ejs");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
res.sendFile(__dirname+"/index.html");})







app.post("/",function (req,res){
    const q=req.body.cityName;

    const apiKey="38193d456123410ea9658c69bc62460c";

    const ur="https://api.spoonacular.com/mealplanner/generate?diet=vegetarian&timeFrame=day&exclude=greek&targetCalories="+q+"&apiKey="+apiKey+"";





    https.get(ur,function (response){


    console.log(response.statusCode);
        var data;
        response.on("data", function(chunk) {
            if (!data) {
                data = chunk;
            } else {
                data += chunk;
            }
        });

        response.on("end", function() {

            res.redirect('/')
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const calories = weatherData.nutrients.calories;
            const protein = weatherData.nutrients.protein;
            const fat = weatherData.nutrients.fat;
            const carbohydrates = weatherData.nutrients.carbohydrates;
            res.write('<div> <ul><li>'+calories+'</li> <li>'+protein+'</li> <li>'+fat+'</li><li>'+carbohydrates+'</li></ul>  </div>' )
            for(var i=0; i<weatherData.meals.length;i++) {
                const temp = weatherData.meals[i].title
                const sourceUrl = weatherData.meals[i].sourceUrl
                const id =weatherData.meals[i].id;


                const image="https://spoonacular.com/recipeImages/"+id+"-240x150.jpg"


                res.render('recipe',{temp:temp});



                res.write( '<h1>'+temp+'</h1>' )
                res.write("<img src="+image+">")

                res.write( '<a href='+ sourceUrl+'>'+sourceUrl+'</a>' )

            }

            res.send()



        });


    })


})

app.listen(3030, function (){
        console.log('Server is running on Port 3030')
})