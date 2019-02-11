import Chance from 'chance';
const chance = new Chance();

chance.mixin({
  thing: () => ({
    title: chance.string({ length: 10 }),
    description: chance.string({ length: 30 }),
  }),
});

export const mockThing = () => chance.thing();

export const mockThings = length => Array.apply(null, { length })
  .reduce(acc => [...acc, mockThing()], []);
