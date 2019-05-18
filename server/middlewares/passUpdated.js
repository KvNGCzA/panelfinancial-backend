import helpers from '../helpers';

const { responseMessage } = helpers;

export default (req, res, next) => {
  const { userData: { passUpdated }, originalUrl } = req;
  // if user is trying to update password on updatepass route
  if (/\/api\/v1\/users\/updatepass/.test(originalUrl)) return next();
  // if users password is updated on another route
  if (passUpdated) return next();
  // if user still has default password
  return responseMessage({ status: 'failure', message: 'please update your password' }, 401, res);
};
