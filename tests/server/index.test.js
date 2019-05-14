import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import app from '../../server';

chai.use(chaiHttp);

const { request } = chai;

describe('DUMMY TEST', () => {
  it('should return msg', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        const { body: { msg }, status: statusCode } = res;
        expect(statusCode).toBe(200);
        expect(msg).toBe('welcome to panel financial');
        done();
      });
  });
});
