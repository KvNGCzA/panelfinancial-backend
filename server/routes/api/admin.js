import express from 'express';

const admin = express.Router();

const base = '/admin';

admin.get(`${base}`, (req, res, next) => {
  res.json({ msg: 'working' });
});

export default admin;
