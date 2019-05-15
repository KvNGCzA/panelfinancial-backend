import bcrypt from 'bcrypt';
import helpers from '../helpers';

const { responseMessage } = helpers;

const { findUserByEmail, createToken } = helpers;

export default class AuthControllers {
  // this function allows users to log into the application
  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    let statusCode = 404;
    try {
      const user = await findUserByEmail(email, next);
      if (user && user.active) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          delete user.password;
          return responseMessage(
            { status: 'success', user, token: createToken(user.id) }, 200, res
          );
        }
        statusCode = 400;
      }
      return responseMessage(
        { status: 'failure', message: 'email/password do not match' }, statusCode, res
      );
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}
