const axios = require("axios").default;
const APIdata = require("./APIs");

async function geocode(query){
    try{
        const response = await axios.get(`${APIdata.data.mapBox.forwardGeocoding}${encodeURI(query)}.json`,{
            params: {
                access_token: APIdata.data.mapBox.Api_key,
                limit: 3,
            }
        })
        if(response.data.features.length === 0){
            return er= {
                er: true,
                status: 400,
                message: "your search cannot be found",
                content: undefined
            };
        } else{
            const place = response.data.features;
            const coordinates = place[0].center;
            return{
                latitude: coordinates[1],
                longitude: coordinates[0],
                placeName: place[0].place_name
            } 
        }
    }catch(error){
        return er={
            er: true,
            status: 503,
            message: "The request was not completed. The server is temporarily overloading or down.",
            content: error
        };
    }
}

module.exports={
    geocode
}