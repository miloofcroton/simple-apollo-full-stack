import 'dotenv/config';
import sequelize from './services/postgres/connection';
import httpServer from './app';

const port = process.env.PORT || 7890;

import createUsersWithMessages from './scripts/createUsersWithMessages';
const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;

sequelize.sync({ force: isTest || isProduction })
  .then(async () => createUsersWithMessages(new Date()))
  .then(async () => httpServer.listen(
    { port },
    () => console.log(`🚀 Server on http://localhost:${port}/graphql`),
  ));
