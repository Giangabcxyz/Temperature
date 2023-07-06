const $ = document.querySelector.bind(document)

let city = $('.city');
let country = $('.country');
let time = $('.time');
let value = $('.value');
let description = $('.description');
let visibility = $('.visibiliti span');
let wind = $('.wind span');
let sun = $('.sun span');
let content = $('.content');
let ip = $('#ip');
let body = $('body');

function changeBackground(tempareture){
    if(tempareture >=26)
    {
         body.setAttribute('class','hot');
    }
    if(20<= tempareture && tempareture<26)
    {
        body.setAttribute('class','warm');
    }
    if(tempareture<20){
        body.setAttribute('class','cool');
    }
}
async function changeWeather(input)
{
    let temp = input.trim();
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${temp}&appid=f95e8180afe18398abb59117b97124a6`;
    let data =  await fetch(urlApi)
    .then(res=>res.json())
    .then(data => data)
    console.log(data);
    if(data.cod == 200)
    {

        city.innerText = data.name;
        country.innerText = data.sys.country;
        time.innerText = new Date().toLocaleString('Vi');
        let tempp = Math.floor(data.main.temp -273.15) ;
        value.innerText = tempp;
        description.innerText = data.weather && data.weather[0].main;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        content.classList.remove('err');
        changeBackground(tempp)
    }else{
        console.log('lỗi hiển thị');
        content.classList.add('err');
    }

}

ip.addEventListener('keydown',function(e){
      if(e.code == "Enter")
      {
          let string = ip.value;
          changeWeather(string)
      }
})

