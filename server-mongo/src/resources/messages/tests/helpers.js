import 'dotenv/config';
import axios from 'axios';

const API_URL = `http://localhost:${process.env.PORT || 7890}/graphql`;


export const messages = async () =>
  axios.post(API_URL, {
    query: `
  query {
    messages (limit: 2) {
        edges {
          text
        }
      }
    }
  `,
  });

export const messagesInclUsers = async () =>
  axios.post(API_URL, {
    query: `
  query {
    messages (limit: 2) {
        edges {
          text
          user {
            username
          }
        }
      }
    }
  `,
  });
