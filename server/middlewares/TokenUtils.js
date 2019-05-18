import jwt from 'jsonwebtoken';
import helpers from '../helpers';
import passUpdated from './passUpdated';

const { findUserById, responseMessage } = helpers;

export default class TokenUtils {
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization || req.query.token;
    if (!token) {
      return responseMessage({ status: 'failure', message: 'please provide a token' }, 401, res);
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, info) => {
        if (err) return err;
        return info;
      }
    );
    if (!decoded.message) {
      const { id } = decoded;
      const findAccount = await findUserById(id, next);
      if (findAccount) {
        req.userData = findAccount;
        // check if user has changed default password
        return passUpdated(req, res, next);
      }
      return responseMessage({ status: 'failure', message: 'account not found' }, 404, res);
    }
    if (decoded.message === 'jwt expired') {
      return responseMessage({ status: 'unauthorized', message: 'token expired' }, 401, res);
    }
    return responseMessage({ status: 'unauthorized', message: 'invalid token' }, 401, res);
  }
}
