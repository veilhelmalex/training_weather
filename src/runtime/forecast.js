const axios = require("axios").default;
const APIdata = require("./APIs");

async function forecast(place, placeName) {
    try{
    const response =  await axios.get(APIdata.data.weather.currentEndpoint, {
            params:{
                access_key: APIdata.data.weather.Api_key,
                query: place,
                units: "m"
            }
        })
        if(response.data.error){
            return er= {
                er: true,
                status: 500,
                message: "The request was not completed. The server met an unexpected condition",
                content: response.data.error
            };
        } else {
            const weather = response.data;
            return {
                temperature: weather.current.temperature, 
                location: placeName, 
                feelslike: weather.current.feelslike,
                forecast: weather.current.weather_descriptions[0]  
        
            }   
         }

    } catch (error){
        return er= {
            er: true,
            status: 400,
            message: "The server did not understand the request, your search cannot be found",
            content: undefined
        };    }
}

module.exports = {
    forecast
}