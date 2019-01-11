import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayOneDay = document.getElementById('current-day');
  const data = await weather.londonOneDayWeather();
  let table = document.createElement("table")

  let displayTemp = document.createElement("tr")
  displayTemp.innerHTML = data[0]
  table.appendChild(displayTemp);

  let displayIcon = document.createElement("tr")
  displayIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data[2] + ".png'>"
  table.appendChild(displayIcon);

  let displayDesc = document.createElement("tr")
  displayDesc.innerHTML = data[1]
  table.appendChild(displayDesc);

  displayOneDay.appendChild(table);
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
