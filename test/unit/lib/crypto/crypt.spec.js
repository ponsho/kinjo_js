import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as bcrypt from 'bcrypt-as-promised';
import 'sinon-as-promised';
import { hashWithSalt,
  compare,
  generateRandomBytes } from '../../../../src/lib/crypto/crypt';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(dirtyChai);

describe('Bcrypt utils', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Hash with Salt', () => {
    it('should return a string', async () => {
      const hashedPw = await hashWithSalt('mypw');
      expect(hashedPw).to.be.a('string');
    });

    it('should rethrow any error happening in the bcrypt hash function', () => {
      sandbox.stub(bcrypt.default, 'hash').rejects('fail');
      return expect(hashWithSalt('wtf')).to.rejectedWith(Error);
    });
  });

  describe('Compare', () => {
    it('should return true for a valid password', async () => {
      const pw = 'mypassword';
      const hashedPw = await hashWithSalt(pw);
      const result = await compare(pw, hashedPw);
      expect(result).to.be.true();
    });

    it('should return false for an invalid password', async () => {
      const hashedPw = await hashWithSalt('myRealPassword');
      const result = await compare('notMyPassword', hashedPw);
      expect(result).to.be.false();
    });

    it('should rethrow any error happening in the bcrypt compare function ', () => {
      sandbox.stub(bcrypt.default, 'compare').rejects('fail');
      return expect(compare('a', 'b')).to.be.rejectedWith(Error);
    });
  });

  describe('Generate Random Bytes', () => {
    it('should generate random bytes as string', async () => {
      const result = await generateRandomBytes(20);
      expect(result).to.a('string');
    });
  });
});
