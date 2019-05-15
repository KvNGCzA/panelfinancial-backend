import models from '../database/models';
import helpers from '../helpers';


const { User, UserRole, Role } = models;
const { responseMessage } = helpers;

export default class AdminControllers {
  // this funciton allows admins and super admins to create users
  static async createUser(req, res, next) {
    const { role: adminRoles } = req.userData;
    const {
      firstName, lastName, roleId, email
    } = req.body;
    if (roleId === 18742 && !adminRoles.includes(18742)) {
      return responseMessage(
        { status: 'failure', message: 'you are not authorized to create a superadmin' }, 403, res
      );
    }
    try {
      const user = await User.findOne({ where: { email } });
      const checkRole = await Role.findByPk(roleId);
      if (user) {
        return responseMessage(
          { status: 'failure', message: 'a user with this email already exists' }, 409, res
        );
      } if (!checkRole) {
        return responseMessage(
          { status: 'failure', message: 'this role does not exist or is unavailable' }, 400, res
        );
      }
      const { id: userId } = await User.create({
        firstName,
        lastName,
        email
      });
      await UserRole.create({ roleId, userId });
      return responseMessage({ status: 'success', message: 'user created successfully' }, 200, res);
    } catch (error) {
      /* istanbul ignore next-line */
      next(error);
    }
  }
}
