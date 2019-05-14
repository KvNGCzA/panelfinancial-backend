import bcrypt from 'bcrypt';
import helpers from '../helpers';

const { findUserByEmail, createToken } = helpers;

export default class AuthControllers {
  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    let statusCode = 404;
    const err = () => res.status(statusCode).json({
      status: 'failure',
      message: 'email/password do not match'
    });
    try {
      const user = await findUserByEmail(email, next);
      if (user && user.active) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          delete user.password;
          return res.status(200).json({
            status: 'success',
            user,
            token: createToken(user.id)
          });
        }
        statusCode = 400;
      }
      return err();
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}
