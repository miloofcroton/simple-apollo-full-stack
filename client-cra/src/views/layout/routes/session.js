import SignIn from '../../lib/session/SignIn';
import SignUp from '../../lib/session/SignUp';
import SignOut from '../../lib/session/SignOut';

import Account from '../../content/users/Account';
import Admin from '../../content/users/Admin';

export const SESSION_ROUTES = {
  SIGN_UP: {
    path: '/signup',
    Component: SignUp,
    linkTo: () => '/signup',
    refetch: true,
  },
  SIGN_IN: {
    path: '/signin',
    Component: SignIn,
    linkTo: () => '/signin',
    refetch: true,
  },
  SIGN_OUT: {
    path: '/signout',
    Component: SignOut,
    linkTo: () => '/signin',
    refetch: true,
  },
  ACCOUNT: {
    Component: Account,
    path: '/account',
    linkTo: () => '/account',
  },
  ADMIN: {
    Component: Admin,
    path: '/admin',
    linkTo: () => '/admin',
  },
};
