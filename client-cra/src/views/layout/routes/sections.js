import Messages from '../../content/messages';
import Items from '../../content/items';
import Things from '../../content/things';

export const SECTIONS_ROUTES = {
  MESSAGES: {
    Component: Messages,
    path: '/messages',
    linkTo: () => '/messages',
    nav: true,
    order: 3,
    label: 'Messages',
  },
  ITEMS: {
    Component: Items,
    path: '/items',
    linkTo: () => '/items',
    nav: true,
    order: 4,
    label: 'Items',
  },
  THINGS: {
    Component: Things,
    path: '/things',
    linkTo: () => '/things',
    nav: true,
    order: 5,
    label: 'Things',
  },
};
