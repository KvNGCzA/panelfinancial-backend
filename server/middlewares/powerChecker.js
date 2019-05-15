import { uniq } from 'lodash';
import models from '../database/models';
import helpers from '../helpers';

const { Role } = models;
const { responseMessage } = helpers;

export default async (req, res, next, authorized) => {
  const { role } = req.userData;
  try {
    const allowed = role.map(async (x) => {
      const { dataValues: { name } } = await Role.findByPk(x);
      return name;
    });
    const userRoles = await Promise.all(allowed);
    const join = [...userRoles, ...authorized];
    const { length } = join;
    const { length: cut } = uniq(join);
    if (length !== cut) return next();
    return responseMessage(
      { status: 'failure', message: 'you are not authorized to perform this action' }, 403, res
    );
  } catch (error) {
    /* istanbul ignore next-line */
    next(error);
  }
};
