const fetch = require('node-fetch');
const City = require('./../models/cityModel');
const getWeather = require('../utils/weatherAPI');


exports.getCities = async() => {
    try { 
        const cities = await City.find();
        return cities;
    }catch(err){
        console.log('failed to get cities');
    }
}

exports.getCityLocation = async() =>{
    try{
        const response = await fetch('http://ip-api.com/json'); 
          const data = await response.json();
          const { lat, lon } = data;
        await getWeather.getWeatherCity(`${lon},${lat}`);
    }catch(err){
        console.log('failed to get location');
    }
}

exports.searchCity = async(name) => {
    try { 
        const city = await City.findOne(name);
        return city;
    }catch(err){
        console.log('failed to get city');
    }
}

exports.getCity = async(id) => {
    try{
        const city = await City.findById(id);
        return city;
    }
    catch(err){
        console.log('failed to get city');
    }
}

exports.addCityByLocation = async(req) => {
    try{
        getWeather.getWeatherCity(req);
    }
    catch(err){
        console.log('failed to add city');
    }
}

exports.addCity = async(req) => {
    try{
        getWeather.getWeatherCity(req);
    }
    catch(err){
        console.log('failed to add city');
    }
}

exports.deleteCity = async(req) => {
    try { 
        const city = await City.findOneAndDelete(req);
        return city;
    }catch(err){
        console.log('failed to delete city');
    }
}