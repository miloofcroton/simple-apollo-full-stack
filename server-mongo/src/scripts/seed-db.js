// const { dropCollection } = require('../util/db');
const axios = require('axios');
const chance = require('chance').Chance();

const HOST = 'http://localhost:7890';

const ITEMS = 5;

Promise.all(Array
  .apply(null, { length: ITEMS })
  .map(() => ({
    title: chance.string({ length: 8 }),
    description: chance.string({ length: 16 })
  }))
  .map(item => {
    const { title, description } = item;
    return axios({
      method: 'post',
      url: `${HOST}/api/items`,
      data: { title, description }
    });
  })
);
