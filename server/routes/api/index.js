import express from 'express';
import users from './users';
import admin from './admin';
import auth from './auth';

const router = express.Router();

router.use(
  '/',
  users,
  admin,
  auth
);

export default router;
