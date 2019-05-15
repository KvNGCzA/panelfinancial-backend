import { findUserById, findUserByEmail } from './findUser';
import createToken from './createToken';
import extractId from './extractId';
import formattedError from './formattedError';
import responseMessage from './responseMessage';

export default {
  findUserById,
  findUserByEmail,
  createToken,
  extractId,
  formattedError,
  responseMessage
};
