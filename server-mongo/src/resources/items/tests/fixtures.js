import Chance from 'chance';
const chance = new Chance();

chance.mixin({
  item: () => ({
    title: chance.string({ length: 10 }),
    description: chance.string({ length: 30 }),
  }),
});

export const mockItem = () => chance.item();

export const mockItems = length => Array.apply(null, { length })
  .reduce(acc => [...acc, mockItem()], []);
