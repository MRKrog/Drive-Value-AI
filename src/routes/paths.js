// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, '/home'),
  search: path(ROOTS_DASHBOARD, '/search'),
  history: path(ROOTS_DASHBOARD, '/history'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
};

export const PATH_PAGE = {
  page404: '/404',
};

// Config paths
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.home;
export const PATH_BEFORE_LOGIN = PATH_AUTH.login;
