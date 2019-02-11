import Thing from '../model';
import { mockThing } from './fixtures';
import { getErrors } from '../../../lib/errorTests';

describe('thing model', () => {

  test('validates a good model', () => {
    const data = mockThing();
    const thing = new Thing(data);
    const jsonThing = thing.toJSON();

    expect(jsonThing).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  test('requires several required fields (see model)', () => {
    const thing = new Thing({});
    const errors = getErrors(thing.validateSync(), 2);

    expect(errors.title.properties.message).toEqual('Path `title` is required.');
    expect(errors.description.properties.message).toEqual('Path `description` is required.');
  });


});
