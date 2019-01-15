import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayOneDay = document.getElementById('current-day');
  const data = await weather.currentDayWeather();
  const backgroundImage = `url('./assets/${data.condition}.png')`;
  document.body.style.backgroundImage = backgroundImage;

  let table = document.createElement("table");

  let tempRow = document.createElement("tr")
  let temp = document.createElement("td")
  temp.setAttribute("class", "temp")
  const tempCell = document.getElementsByClassName('temp');
  temp.innerHTML = data.temp
  temp.style.color = styleTemperature(data.temp)
  tempRow.appendChild(temp)
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
};

async function getWeatherFive() {
  const data = await weather.nextFourDaysWeather();
  return data;
};

function styleTemperature(temperature) {
  let color = '';
  switch (true) {
    case (temperature < 0):
      color = '#00CED1';
      break;
    case (temperature >=0 && temperature < 9):
      color = '#66CDAA';
      break;
    case (temperature >=9 && temperature < 20):
      color = '#DEB887';
      break;
    case (temperature >=20 && temperature < 30):
      color = '#FFD700';
      break;
    case (temperature > 30):
      color = '#FF4500';
      break;
    default:
      color = 'black';
      break;
  }
  return color;
}

async function displayForecast() {
  const forecast = await weather.getForecast()
  const displayFourDays = document.getElementById('next-four-days')
  let table = document.createElement("table")
  table.setAttribute("id", "table-four")
  const tempCell = document.getElementById('temp');

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
        temp.setAttribute("class", "temp")
        let temperature = item.temp
        // tempCell.style.color = styleTemperature(item.temp)
        temp.style.color = styleTemperature(data.temp)
        temp.innerHTML = `${temperature}\xB0C`;
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
