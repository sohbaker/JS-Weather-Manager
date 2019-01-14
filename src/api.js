const fetch = require("node-fetch");
// require('dotenv').config();

export class Api {
 async oneDayApiCall() {
   const call = await fetch('https://api.openweathermap.org/data/2.5/find?q=London,UK&units=metric&appid='+ process.env.API_KEY);
   const data = await call.json();
   return data;
 }

 async fiveDayApiCall() {
   const call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&appid='+ process.env.API_KEY);
   const data = await call.json();
   return data;
 }
}
