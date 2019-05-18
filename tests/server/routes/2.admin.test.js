import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import dotenv from 'dotenv';
import app from '../../../server';
import { superAdminToken, adminToken, employeeToken } from '../__mocks__/tokens';

dotenv.config();

chai.use(chaiHttp);

const { request } = chai;

const createUserUrl = '/api/v1/admin/createuser';
const updatePassUrl = '/api/v1/users/updatepass';

describe('TEST IF USER HAS UPDATED PASSWORD FROM DEFAULT', async () => {
  it('should fail if password is not updated from default (superAdmin)', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', superAdminToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 9786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(401);
        expect(status).toBe('failure');
        expect(message).toBe('please update your password');
        done();
      });
  });

  it('should fail if password is not updated from default (admin)', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 9786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(401);
        expect(status).toBe('failure');
        expect(message).toBe('please update your password');
        done();
      });
  });

  it('should fail if password is not updated from default (employee)', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', employeeToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 9786
      })
      .end((err, res) => {
        expect(err).toBe(null);
        const { body: { status, message }, status: statusCode } = res;
        expect(statusCode).toBe(401);
        expect(status).toBe('failure');
        expect(message).toBe('please update your password');
        done();
      });
  });
});

describe('TEST UPDATE PASSWORD ROUTE', () => {
  it('should update password for super admin', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', superAdminToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(201);
        expect(status).toBe('success');
        expect(message).toBe('password updated successfully');
        done();
      });
  });

  it('should fail to update same password for super admin', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', superAdminToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(400);
        expect(status).toBe('failure');
        expect(message).toBe('you have used this password before');
        done();
      });
  });

  it('should update password for admin', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', adminToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(201);
        expect(status).toBe('success');
        expect(message).toBe('password updated successfully');
        done();
      });
  });

  it('should fail to update same password for admin', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', adminToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(400);
        expect(status).toBe('failure');
        expect(message).toBe('you have used this password before');
        done();
      });
  });

  it('should update password for employee', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', employeeToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(201);
        expect(status).toBe('success');
        expect(message).toBe('password updated successfully');
        done();
      });
  });

  it('should fail to update same password for employee', (done) => {
    request(app)
      .put(updatePassUrl)
      .set('Authorization', employeeToken)
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(400);
        expect(status).toBe('failure');
        expect(message).toBe('you have used this password before');
        done();
      });
  });
});

describe('TEST CREATE USER ROUTE', () => {
  it('should fail to create user if accessed by an employee', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', employeeToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 9786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(403);
        expect(status).toBe('failure');
        expect(message).toBe('you are not authorized to perform this action');
        done();
      });
  });

  it('should fail if admin tries to create a super admin', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 18742
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(403);
        expect(status).toBe('failure');
        expect(message).toBe('you are not authorized to create a superadmin');
        done();
      });
  });

  it('should succeed if a superadmin tries to create a superadmin', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', superAdminToken)
      .send({
        email: 'fail@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 18742
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        expect(message).toBe('user created successfully');
        done();
      });
  });

  it('should succeed if a superadmin tries to create an admin', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', superAdminToken)
      .send({
        email: 'faisl@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 18742
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        expect(message).toBe('user created successfully');
        done();
      });
  });

  it('should succeed if an admin tries to create an admin', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faissl@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 9786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        expect(message).toBe('user created successfully');
        done();
      });
  });

  it('should succeed if a superadmin tries to create an employee', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', superAdminToken)
      .send({
        email: 'faissssl@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        expect(message).toBe('user created successfully');
        done();
      });
  });

  it('should succeed if an admin tries to create an employee', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faiissssl@jsnd.com',
        firstName: 'fail',
        lastName: 'fail',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, message }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(200);
        expect(status).toBe('success');
        expect(message).toBe('user created successfully');
        done();
      });
  });

  it('should fail if first name is not provided', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faiissssl@jsnd.com',
        firstName: '',
        lastName: 'fail',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.firstName[0]).toBe('please enter a first name');
        done();
      });
  });

  it('should fail if first name is an invalid format', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faiissssl@jsnd.com',
        firstName: '242',
        lastName: 'fail',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.firstName[0]).toBe('please enter a valid first name');
        done();
      });
  });

  it('should fail if last name is not provided', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faiissssl@jsnd.com',
        firstName: 'edfadf',
        lastName: '',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.lastName[0]).toBe('please enter a last name');
        done();
      });
  });

  it('should fail if last name is an invalid format', (done) => {
    request(app)
      .post(createUserUrl)
      .set('Authorization', adminToken)
      .send({
        email: 'faiissssl@jsnd.com',
        firstName: 'igub',
        lastName: '3424',
        roleId: 92786
      })
      .end((err, res) => {
        const { body: { status, errors }, status: statusCode } = res;
        expect(err).toBe(null);
        expect(statusCode).toBe(422);
        expect(status).toBe('failure');
        expect(errors.lastName[0]).toBe('please enter a valid last name');
        done();
      });
  });
});
