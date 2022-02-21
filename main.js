var Weather = {
    API_KEY:"appid=2262219a6176e140b48412f4ca886f7f",
    URL_BASE:"https://api.openweathermap.org/data/2.5/weather?",
    URL_LANG:'lang=pt_br',
    URL_UNITS:"units=metric",
    URL_ICON: "http://openweathermap.org/img/wn/"
}

let loading_el = document.querySelector('.loading-el');
let search_btn = document.querySelector('#search-btn');
let city_name_input = document.querySelector('#city-name');
let cityName_element = document.querySelector('h2');
let date_element = document.querySelector('p');
let temp_element = document.querySelector('h1');
let wather_element = document.querySelector('#weather-el');
let wind_el = document.querySelector('#wind-el');
let humidity_el = document.querySelector('#humidity-el');
let icon_weather = document.querySelector('#icon-weather');



function getData(url){
    fetch(url)
    .then((response)=>{
        return response.json();
    }).then((data)=>{
        Loading_Animation();
        Set_Weather(data);
    
    }).catch((error)=>{
        alert('No weather found.')
    })
}


Your_Location();
function Your_Location(){
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(Position, Show_Error);
    }
    else{
        alert('O seu navegador não suporta geolozalicação!');
    }

    function Position(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        Your_Coordinate(lat, long);
    }

    function Show_Error(error){
        alert(`erro: ${error.message}`);
    }
}


function Your_Coordinate(latitude, longitude){
    getData(`${Weather.URL_BASE}lat=${latitude}&lon=${longitude}&${Weather.API_KEY}&${Weather.URL_LANG}&${Weather.URL_UNITS}`);
}

city_name_input.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13){ /* Enter press */
        getData(`${Weather.URL_BASE}q=${city_name_input.value}&${Weather.API_KEY}&${Weather.URL_LANG}&${Weather.URL_UNITS}`);
        loading_el.style.animation = '';
    }
    
})

search_btn.addEventListener('click', ()=>{
    getData(`${Weather.URL_BASE}q=${city_name_input.value}&${Weather.API_KEY}&${Weather.URL_LANG}&${Weather.URL_UNITS}`);
    loading_el.style.animation = '';
})


function Set_Weather(data){
    let City_name = data.name;
    let Country = data.sys.country;
    cityName_element.innerText = `${City_name}, ${Country}`;

    let now = new Date();
    date_element.innerText = Set_Date(now);

    temp_element.innerText = `${Math.round(data.main.temp)}°c`;

    wather_element.innerText = data.weather[0].description;
    
    humidity_el.innerText = `Humidade: ${data.main.humidity}%`;
    wind_el.innerText = `Vento: ${data.wind.speed} km/h`;

    icon_weather.src = Weather.URL_ICON+data.weather[0].icon+".png";

}

function Set_Date(date){
    let days = ['Domingo', 'Segunda','Terça','Quarta','Quinta','Sexta','Sabádo'];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function Loading_Animation(){
    loading_el.style.animation = 'loadAnima2 1s both';
}
