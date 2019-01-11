import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayTemp = document.getElementById('one-day-weather');
  const displayDesc = document.getElementById('one-day-description');
  const displayIcon = document.getElementById('one-day-icon')
  const data = await weather.londonOneDayWeather();
  displayTemp.innerHTML = data[0];
  displayDesc.innerHTML = data[1];
  displayIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data[2] + ".png'>"
}

async function getWeatherFive() {
  const data = await weather.getForecast();
  return data;
}

async function displayForecast() {
  const forecast = await getWeatherFive()

  const displayFourDays = document.getElementById('next-four-days')
  let table = document.createElement("table")

  forecast.forEach((obj) =>  {
    let day = document.createElement("tr")
    day.innerHTML = obj.day
    table.appendChild(day);

    let date = document.createElement("tr")
    date.innerHTML = obj.date
    table.appendChild(date);

    let data = obj.data
    let timeRow = document.createElement("tr")
    let tempRow = document.createElement("tr")
    let iconRow = document.createElement("tr")
    let descriptionRow = document.createElement("tr")

      data.forEach((item) => {
        let time = document.createElement("td")
        time.innerHTML = item.time
        timeRow.appendChild(time);

        let temp = document.createElement("td")
        temp.innerHTML = item.temp
        tempRow.appendChild(temp);

        let icon = document.createElement("td")
        let iconUrl = "http://openweathermap.org/img/w/" + item.icon + ".png";
        icon.innerHTML = "<img src='" + iconUrl  + "'>";
        iconRow.appendChild(icon);

        let desc = document.createElement("td")
        desc.innerHTML = item.desc
        descriptionRow.appendChild(desc);
      })

    table.appendChild(timeRow);
    table.appendChild(tempRow);
    table.appendChild(iconRow);
    table.appendChild(descriptionRow);
    displayFourDays.appendChild(table);
  })
}

getWeatherOne();
getWeatherFive();
displayForecast();
