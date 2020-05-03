async function getEndpoint(endpoint, params = new Map()){
    let markup = `/${endpoint}?`;
    let count = params.size - 1;
    params.forEach((val, key) =>{
        markup += `${key}=${val}`

        if(count > 0){
            markup += `&`
            count --;
        } 
    })
    const response = await fetch(markup);
    return response.json();
}

//get elements from the UI
const inputUI = document.querySelector("input");

const displayWeather= (result) => {
    const displayCanvas = document.querySelector(".display__weather");
    displayCanvas.innerHTML = " ";
    const values = Object.entries(result);
    let markup;
    if(values[0][0]== "error"){
        console.log(values);
        markup = `<p id="error">${values[2][1]}</p>`
    }else {
        markup = values.map((element)=>{
            let mark = `<p id="${element[0]}"> ${element[0]} = ${element[1]} <p/>`
            return mark;
        }).join(" ");
    }
    
    displayCanvas.insertAdjacentHTML("beforeend",markup);
    inputUI.focus();
}

document.querySelector(".input").addEventListener("submit",(event)=> {
    event.preventDefault();
    let location = inputUI.value;
    const weatherParams = new Map();
    weatherParams.set("location", location);
    getEndpoint("weather", weatherParams)
    .then(result =>{displayWeather(result)} );
})
