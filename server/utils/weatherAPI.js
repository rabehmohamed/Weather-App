const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
const City = require('./../models/cityModel')

exports.getWeather = async (cities) => {
  
   for(const el of cities){
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://api.weatherstack.com/current',
        params: (() => {
          if (isNaN(el)) {
            return { access_key: process.env.API_ACCESS_KEY, query: el };
          } else {
            const [lon, lat] = el.split(',');
            return { access_key: process.env.API_ACCESS_KEY, lon, lat };
          }
        })(),
      });
     
      const {
        location: { name , country },
        current: { temperature , weather_descriptions : condition, humidity, wind_speed, cloudcover },
      } = res.data;
  
      let city = await City.findOne({ name });
  
      if (city) {
        city.name = name;
        city.country = country;
        city.temperature = temperature;
        city.condition = condition[0];
        city.humidity = humidity;
        city.wind_speed = wind_speed;
        city.cloudcover = cloudcover;
        await city.save();
      } else {
        await City.create({
          name,
          country,
          temperature,
          humidity,
          condition: condition[0],
          wind_speed,
          cloudcover,
        });
      } 
    } catch (error) {
      console.error(error);
    }
  }
  
}

exports.getWeatherCity = async (req) => {
  let search = req;
  if(req.name){
    search = req.name;
  }
  console.log(req);
   try {
     const res = await axios({
       method: 'GET',
       url: 'http://api.weatherstack.com/current',
       params: (() => {
         if (isNaN(search)) {
           return { access_key: process.env.API_ACCESS_KEY, query: search };
           
         } else {    
           const [lon, lat] = search.split(',');
           return { access_key: process.env.API_ACCESS_KEY, lon, lat };
         }
       })(),
     });
     const {
       location: { name , country },
       current: { temperature , weather_descriptions : condition, humidity, wind_speed, cloudcover },
     } = res.data;
 
     let city = await City.findOne({ name });
     if (city) {
       city.name = name;
       city.country = country;
       city.temperature = temperature;
       city.condition = condition[0];
       city.humidity = humidity;
       city.wind_speed = wind_speed;
       city.cloudcover = cloudcover;
       await city.save();
     } else {
       await City.create({
         name,
         country,
         temperature,
         humidity,
         condition: condition[0],
         wind_speed,
         cloudcover,
       });
     } 
   } catch (error) {
     console.error(error);
   }
 }
 

