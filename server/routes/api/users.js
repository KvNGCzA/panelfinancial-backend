import express from 'express';

const user = express.Router();


// sign user
user.post(
  '/users/signup'
);

export default user;
