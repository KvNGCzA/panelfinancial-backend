import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import dotenv from 'dotenv';
import app from '../../../server';

dotenv.config();

chai.use(chaiHttp);

const { request } = chai;

const loginUrl = '/api/v1/auth/login';

describe('TEST LGOIN ROUTE', () => {
  it('should login successfully', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: 'simontaylor@panelfinancial.com',
        password: process.env.DEFAULT_PASS
      })
      .end((err, res) => {
        const { body: { status }, status: statusCode } = res;
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        done();
      });
  });

  it('should fail to log in', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: 'joseph@yahoo.com',
        password: 'jklms'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(statusCode).toBe(404);
        expect(status).toBe('failure');
        expect(message).toBe('email/password do not match');
        done();
      });
  });

  it('should fail to log in if password is wrong', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: 'simontaylor@panelfinancial.com',
        password: 'jklms'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(statusCode).toBe(400);
        expect(status).toBe('failure');
        expect(message).toBe('email/password do not match');
        done();
      });
  });

  it('should fail if email is not provided', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: '',
        password: 'jklms'
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.email[0]).toBe('please enter an email');
        done();
      });
  });

  it('should fail if email is not a valid format', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: 'jhnodwn.com',
        password: 'jklms'
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.email[0]).toBe('please enter a valid email');
        done();
      });
  });

  it('should fail if password is not provided', (done) => {
    request(app)
      .post(loginUrl)
      .send({
        email: 'jhnodwn@jnon.com',
        password: ''
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.password[0]).toBe('please enter a password');
        done();
      });
  });
});
