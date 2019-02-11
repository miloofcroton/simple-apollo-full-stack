import Item from '../model';
import { mockItem } from './fixtures';
import { getErrors } from '../../../lib/errorTests';

describe('item model', () => {

  test('validates a good model', () => {
    const data = mockItem();
    const item = new Item(data);
    const jsonItem = item.toJSON();

    expect(jsonItem).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  test('requires several required fields (see model)', () => {
    const item = new Item({});
    const errors = getErrors(item.validateSync(), 2);

    expect(errors.title.properties.message).toEqual('Path `title` is required.');
    expect(errors.description.properties.message).toEqual('Path `description` is required.');
  });


});
