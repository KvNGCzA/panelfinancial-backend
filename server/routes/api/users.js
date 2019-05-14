import express from 'express';

const user = express.Router();

const base = '/users';

// sign user
user.post(
  `${base}/signup`
);

export default user;
