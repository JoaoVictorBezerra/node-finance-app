import { response } from './response.js';

export const error = {
  email: () =>
    response.badRequest({
      message: 'Invalid email. Please provider an valid email',
    }),
  poorPassword: () =>
    response.badRequest({
      message: 'Password must be at least 6 characters',
    }),
  userId: () =>
    response.badRequest({
      message: 'The provided user id is not valid.',
    }),
  internal: () => response.error({ message: 'Internal server error' }),
};
