import express from 'express';
import middlewares from '../../middlewares';
import AdminControllers from '../../controllers/AdminControllers';
import UserValidation from '../../middlewares/UserValidation';

const { validateAdminCreateUser } = UserValidation;
const { createUser } = AdminControllers;
const { powerChecker, TokenUtils } = middlewares;
const { verifyToken } = TokenUtils;
const admin = express.Router();

const base = '/admin';

admin.post(
  `${base}/createuser`,
  verifyToken,
  validateAdminCreateUser,
  (req, res, next) => powerChecker(req, res, next, ['Super Admin', 'Admin']),
  createUser
);

export default admin;
