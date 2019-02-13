import { Weather } from './weather';

const weather = new Weather();

function setBackground(condition) {
  let cssImageUrl = '';
  switch (true) {
    case condition >= 200 && condition < 300:
      cssImageUrl = "url('./assets/Thunderstorm.png')";
      break;
    case condition >= 300 && condition < 500:
      cssImageUrl = "url('./assets/Drizzle.png')";
      break;
    case condition >= 500 && condition < 600:
      cssImageUrl = "url('./assets/Rain.png')";
      break;
    case condition >= 600 && condition < 700:
      cssImageUrl = "url('./assets/Snow.png')";
      break;
    case condition >= 700 && condition < 800:
      cssImageUrl = "url('./assets/Atmosphere.png')";
      break;
    case condition === 800:
      cssImageUrl = "url('./assets/Clear.png')";
      break;
    case condition > 800 && condition < 805:
      cssImageUrl = "url('./assets/Clouds.png')";
      break;
    default:
      cssImageUrl = 'url(\'./assets/background.png\')';
      break;
  }
  return cssImageUrl;
}

function styleTemperature(temperature) {
  let color = '';
  switch (true) {
    case temperature < 0:
      color = '#31C5F4';
      break;
    case temperature >= 0 && temperature < 9:
      color = '#66CDAA';
      break;
    case temperature >= 9 && temperature < 20:
      color = '#E2B171';
      break;
    case temperature >= 20 && temperature < 30:
      color = '#F1CF17';
      break;
    case temperature > 30:
      color = '#E78D1A';
      break;
    default:
      color = 'black';
      break;
  }
  return color;
}

async function getWeatherOne() {
  const displayOneDay = document.getElementById('current-day');
  displayOneDay.setAttribute('class', 'flex-container');
  const data = await weather.currentDayWeather();
  const backgroundImage = setBackground(data.conditionID);
  document.body.style.backgroundImage = backgroundImage;

  const temp = document.createElement('p');
  temp.setAttribute('id', 'today-temp');
  temp.innerHTML = `${data.temp}\xB0C`;
  temp.style.color = styleTemperature(data.temp);
  displayOneDay.appendChild(temp);

  const icon = document.createElement('p');
  icon.setAttribute('id', 'today-icon');
  icon.innerHTML = `<img src='http://openweathermap.org/img/w/${data.icon}.png'>`;
  displayOneDay.appendChild(icon);

  const desc = document.createElement('p');
  desc.setAttribute('id', 'today-description');
  desc.innerHTML = data.description;
  displayOneDay.appendChild(desc);
}

async function getWeatherFive() {
  const data = await weather.nextFourDaysWeather();
  return data;
}

async function displayForecast() {
  const forecast = await weather.getForecast();
  const displayFourDays = document.getElementById('next-four-days');
  const table = document.createElement('table');

  forecast.forEach((obj) => {
    const day = document.createElement('tr');
    day.setAttribute('id', 'day');
    day.innerHTML = `<td colspan="4">${obj.day}</td>`;
    table.appendChild(day);

    const date = document.createElement('tr');
    date.setAttribute('id', 'date');
    date.innerHTML = `<td colspan="4">${obj.date}</td>`;
    table.appendChild(date);

    // eslint-disable-next-line prefer-destructuring
    const data = obj.data;
    const timeRow = document.createElement('tr');
    const tempRow = document.createElement('tr');
    const iconRow = document.createElement('tr');
    const descriptionRow = document.createElement('tr');

    data.forEach((item) => {
      const time = document.createElement('td');
      time.innerHTML = item.time;
      timeRow.appendChild(time);

      const temp = document.createElement('td');
      const temperature = item.temp;
      temp.style.color = styleTemperature(temperature);
      temp.innerHTML = `${temperature}\xB0C`;
      tempRow.appendChild(temp);

      const icon = document.createElement('td');
      const iconUrl = `http://openweathermap.org/img/w/${item.icon}.png`;
      icon.innerHTML = `<img src='${iconUrl}'>`;
      iconRow.appendChild(icon);

      const desc = document.createElement('td');
      desc.innerHTML = item.desc;
      descriptionRow.appendChild(desc);
    });

    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<br>';

    table.appendChild(timeRow);
    table.appendChild(tempRow);
    table.appendChild(iconRow);
    table.appendChild(descriptionRow);
    table.appendChild(emptyRow);
    displayFourDays.appendChild(table);
  });
}

getWeatherOne();
getWeatherFive();
displayForecast();
