const path = require("path")
const express = require("express");
const hbs = require("hbs");
const g = require(`./runtime/geocode`);
const f = require(`./runtime/forecast`);
const chalk = require("chalk")
//set paths to express config
const publicDirectoryPath = path.join(__dirname,"../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


const app = express();
const port = process.env.PORT || 3000;

//configure hbs as my render/view engine
app.set("view engine", "hbs")
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

//setup an static server engine
app.use(express.static(publicDirectoryPath));

//functions to setup depending on the request 
app.get(``, (req, res) => {
    res.render(`index.hbs`, {
    title: "Weather",
    name: "Veilhelm Alexander Guarin",
    })
})

app.get(`/help`, (req, res) => {
    res.render("template", {
        title: "help",
        name: "Veilhelm Alexander Guarin"

    })
})

app.get(`/about`, (req, res) => {
    res.render("template", {
        title: "about",
        name: "Veilhelm Alexander Guarin"
    })
})

//function to setup the endpoints of the API

errorHandler = ({content, message, status}, res) => {
    res.send({
        error: true,
        status,
        message
    })
    if(content){
        console.log(chalk.red(content))
    }
    return {
        er:true,
        message: "please try again",
        content: content
    }
}

app.get(`/weather`, (req, res)=>{
    if(req.query.location){
        console.log(chalk.red("there was a request"))
        let location = req.query.location;
        g.geocode(location)
        .then(result => result.er ? errorHandler(result, res) : f.forecast(`${result.latitude},${result.longitude}`,result.placeName))
        .then(result => result.er ? errorHandler(result, res) : res.send({
            status: 200,
            locationGiven: location,
            location: result.location,
            forecast: result.forecast,
            temperature: result.temperature,
            feelsLike: result.feelslike,
            icons: result.icon
        }))
        return true;     
    }
    res.send({
        error: true,
        message: "please send a valid location"
    })
})

//functions that handles non existent URLs
app.get(`/help/*`,(req, res)=> {
    res.render("404", {
        error: "the article that you´re trying to reach is not abailable",
        name: "Alexander Guarin",
        title: "404 error"
    })
})

app.get(`*`,(req, res)=> {
    res.render("404", {
        error: "the page that you´re trying to reach cannot be found",
        name: "Alexander Guarin",
        title: "404 error"
    })
})




//start the app at port 3000
app.listen(port, () =>{
    console.log(`app is running at port ${port}`);
})