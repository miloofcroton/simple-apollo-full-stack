import 'dotenv/config';
import mongoose from 'mongoose';
import { connect } from './connection';

export const dropCollection = name => {
  const { DATABASE_URL } = process.env;
  connect(DATABASE_URL);
  return mongoose.connection.dropCollection(name)
    .catch(err => {
      if (err.codeName !== 'NamespaceNotFound') throw err;
    });
};
