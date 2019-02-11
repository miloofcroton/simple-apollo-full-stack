import 'dotenv/config';
import { connect } from './services/mongo/connection';
import httpServer from './app';

const port = process.env.PORT || 7890;

connect()
  .then(() => httpServer.listen(
    { port },
    () => console.log(`🚀 Server on http://localhost:${port}/graphql`),
  ));
