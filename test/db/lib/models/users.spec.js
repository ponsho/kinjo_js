

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiAsPromised from 'chai-as-promised';
import User from '../../../../src/lib/models/users'

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Users model', () => {
  before(async function () {
    // Start with a Sandboxed DB
    await User.destroy({ truncate: true });
  });

  describe('User pre save hooks', () => {
    it('should hash the password', async function () {
      const password = 'myPassword';
      const email = 'user1@gmail.com';
      await User.create({ email, password });
      const savedUser = await User.findOne({where: {email}});
      expect(savedUser.password).to.not.equal(password);
    });
  });
});
