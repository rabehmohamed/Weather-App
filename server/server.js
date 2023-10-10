const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');
const { ApolloServer , gql } = require('apollo-server-express');
const  typeDefs = require ('./graphql/schema');
const resolvers = require ('./graphql/resolvers');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const City = require('./models/cityModel');
dotenv.config({path : './config.env'});

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    introspection: true,
    playground: true, 
    
 }); 

server.start().then(() => {
    server.applyMiddleware({ app });
  });

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE.replace(
    '<password>' ,
     process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('DB connection successful');
  }).catch((err) => {
    console.error('DB connection error:', err);
  });

app.use(bodyParser.json());
app.use(cors());


app.listen(port , ()=> {
    console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`)
})
