import Home from '../../content/home';
import About from '../../content/about';

export const CORE_ROUTES = {
  HOME: {
    Component: Home,
    path: '/',
    linkTo: () => '/',
    default: true,
    nav: true,
    order: 1,
    label: 'Home',
  },
  ABOUT: {
    Component: About,
    path: '/about',
    linkTo: () => '/about',
    nav: true,
    order: 2,
    label: 'About',
  },
};
