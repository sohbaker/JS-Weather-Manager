import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayOneDay = document.getElementById('current-day');
  const data = await weather.currentDayWeather();
  let table = document.createElement("table")

  let tempRow = document.createElement("tr")
  let displayTemp = document.createElement("td")
  displayTemp.innerHTML = data.temp
  tempRow.appendChild(displayTemp)
  table.appendChild(tempRow);

  let iconRow = document.createElement("tr")
  let displayIcon = document.createElement("td")
  displayIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data.icon + ".png'>"
  iconRow.appendChild(displayIcon)
  table.appendChild(iconRow);

  let descRow = document.createElement("tr")
  let displayDesc = document.createElement("td")
  displayDesc.innerHTML = data.description
  descRow.appendChild(displayDesc)
  table.appendChild(descRow);

  displayOneDay.appendChild(table);
}

async function getWeatherFive() {
  const data = await weather.nextFourDaysWeather();
  return data;
}

async function displayForecast() {
  const forecast = await weather.getForecast()
  const displayFourDays = document.getElementById('next-four-days')
  let table = document.createElement("table")
  table.setAttribute("id", "table-four")

  forecast.forEach((obj) =>  {
    let day = document.createElement("tr")
    day.setAttribute("id", "day")
    day.innerHTML = "<td colspan=\"4\">" + obj.day + "</td>"
    table.appendChild(day);

    let date = document.createElement("tr")
    date.setAttribute("id", "date")
    date.innerHTML = "<td colspan=\"4\">" + obj.date + "</td>"
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

    let space = document.createElement("tr")
    space.innerHTML = "<br>"

    table.appendChild(timeRow);
    table.appendChild(tempRow);
    table.appendChild(iconRow);
    table.appendChild(descriptionRow);
    table.appendChild(space);
    displayFourDays.appendChild(table);
  })
}

getWeatherOne();
getWeatherFive();
displayForecast();
