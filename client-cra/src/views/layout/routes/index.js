import { CORE_ROUTES } from './core';
import { SECTIONS_ROUTES } from './sections';
import { SESSION_ROUTES } from './session';

export const ROUTES = {
  ...CORE_ROUTES,
  ...SESSION_ROUTES,
  ...SECTIONS_ROUTES,
};
