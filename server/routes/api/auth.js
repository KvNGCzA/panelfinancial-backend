import express from 'express';
import AuthControllers from '../../controllers/AuthControllers';
import middlewares from '../../middlewares';

const auth = express.Router();

const { loginUser } = AuthControllers;
const { UserValidation } = middlewares;
const { validateUserLogin } = UserValidation;

const base = '/auth';

// login auth
auth.post(
  `${base}/login`, validateUserLogin, loginUser
);

export default auth;
