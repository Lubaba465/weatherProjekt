const express= require('express');
const https=require("https");
const bodyParser=require('body-parser');
const ejs = require("ejs");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function (req,res){
    const q=req.body.calorie;
    res.render('recipe', {q:q});
})







app.post("/",function (req,res){
    const q=req.body.calorie;

    const apiKey="8e608fc0029c41a78b99622a459851c6";

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

         const Data=JSON.parse(data);
            console.log(Data);


                res.render('recipe',{mealsitem:Data.meals,nutrients:Data.nutrients ,q:q});











        });


    })


})

app.listen(4020, function (){
        console.log('Server is running on Port 3000')
})