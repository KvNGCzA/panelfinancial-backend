import { findUserById, findUserByEmail } from './findUser';
import createToken from './createToken';
import extractId from './extractId';
import formattedError from './formattedError';

export default {
  findUserById,
  findUserByEmail,
  createToken,
  extractId,
  formattedError
};
