import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import schema from './src/docSchema';
import User from './src/models/user';
import Phone from './src/models/phone';

const PORT = 4000;
const SECRET = uuidv4();
const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: { User, Phone }
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

server.use('/', (req, res) => {
  res.json('address to /graphiql to test your queries and mutation');
});

server.listen(PORT, () => {
  console.log(`GraphQL server now is running on http://localhost:${PORT}`);
});
