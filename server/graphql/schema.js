const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type City {
    id : ID!
    name : String!
    country : String!
    temperature : Int!
    condition : String
    humidity : Int
    wind_speed : Int
    cloudcover : Int
  }
  type Location {
    location: String
  }
  type Query {
    cities : [City]
    searchCity(name : String!) : City
    getCity (id : ID!) : City
    getCityLocation: Location
  }
  type Mutation {
    deleteCity(name : String!) : City
    addCity(name : addCityInput) : [City]
    addCityByLocation(location: LocationInput!) : [City]
  }
  input addCityInput{
    name : String!
  }
  input LocationInput {
  location: String
}
`;

module.exports = typeDefs;
