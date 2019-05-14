import models from '../database/models';
import extractId from './extractId';

const {
  User,
  UserRole,
} = models;

const userQuery = {
  include: [{
    model: UserRole,
    as: 'role',
    attributes: ['roleId']
  }]
};

const extractUserInfo = user => ({
  ...user.dataValues,
  role: extractId('roleId', user.role)
});

export const findUserById = async (id, next) => {
  try {
    const user = await User.findByPk(id, { ...userQuery });
    if (user) return extractUserInfo(user);
    return null;
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

export const findUserByEmail = async (email, next) => {
  try {
    const user = await User.findOne({ where: { email }, ...userQuery });
    if (user) return extractUserInfo(user);
    return null;
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};
