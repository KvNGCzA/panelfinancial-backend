import express from 'express';
import users from './users';
import admin from './admin';

const router = express.Router();

router.use(
  '/',
  users,
  admin
);

export default router;
