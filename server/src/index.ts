import 'dotenv/config';
import express, {Application, Request, Response, NextFunction} from "express";
import cors from "cors";
import network from "./network";
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { RootQuery, RootMutation } from './graphql/shcema/resolvers';
// import RootMutation from './graphql/resolvers';

const schema = new GraphQLSchema({query: RootQuery, mutation: RootMutation});
const app: Application = express();

// Route middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ping home route
app.get('/', (req: Request, res: Response) => {
  try {
    return res.status(200).json('Ok');
  } catch (error) {
    return res.status(500).json('Internal Server Error!');
  }
});

// Verify request
// app.use('/', authenticate);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Set up port and start the server
app.listen( process.env.PORT, () => {
  console.log(`Server running at:`);
  console.log(`- Local: http://localhost:${process.env.PORT} 🚀 ☁️`);
  console.log(`- Network: http://${network}:${process.env.PORT} 🚀 ☁️`);
});

export default app;