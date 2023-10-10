const cityController = require('./../controllers/cityController');
const City = require('../models/cityModel');


const resolvers = {
    Query: {
        cities : async () => {
            try {
                const cities = await cityController.getCities();
                return cities;
            }
            catch(err){
                throw new Error('failed to get cities');
            }
        },
        searchCity : async (_,{name}) => {
          try {
            const city = await cityController.searchCity({name});
            return city;
          }catch(err){
            throw new Error('failed to get city');
        }
        },
        getCity : async(_,{id}) =>{
          try{
            return await cityController.getCity(id);
          }
          catch(err){
            console.log('can not get city')
          }
        },
        getCityLocation: async (_, __, { req }) => {
          try {
            const response = await fetch('http://ip-api.com/json');
            const data = await response.json();
            const { lat, lon } = data;
            return { location: `${lat},${lon}` };

          } catch (error) {
            console.error('Error fetching location:', error);
            throw new Error('Failed to fetch location data');
          }
      },
    },
    Mutation : {
      deleteCity : async (_,{name})=> {
        try{
          const city = await cityController.deleteCity({name});
          return city;
        }
        catch(err){
          throw new Error('failed to get city');
        }
      },
      addCity : async(_,{name}) => {
        try {
          await cityController.addCity(name);
          return cityController.getCities();
          
        }catch(err){
          console.log('can not add city')
        }
      },
      addCityByLocation: async (_, __, { req }) => {
          try {
                const locationData = await resolvers.Query.getCityLocation(_, __, { req });
                const { location } = locationData;

                await cityController.addCityByLocation(location);

                const cities = await cityController.getCities();
                return cities
            
          }catch(err){
            console.log('can not add city')
          }
      },
    }
  };

module.exports = resolvers;