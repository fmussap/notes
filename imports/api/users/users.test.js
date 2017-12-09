import { expect } from 'meteor/practicalmeteor:chai'
import { Meteor } from 'meteor/meteor'
import { validateNewUser } from './index'

if (Meteor.isServer) {
  describe('users', function () {
    it('validateNewUser should be a function', () => {
      expect(validateNewUser).to.be.a('function')
    })

    it('validateNewUser("fmussap@yahoo.com") should return true', () => {
      const testUser = {
        emails: [{
          address: 'fmussap@yahoo.com'
        }]
      }
      expect(validateNewUser(testUser)).to.be.equal(true)
    })

    it('validateNewUser("fmussap") should throw an error', () => {
      const testUser = {
        emails: [{
          address: 'fmussap'
        }]
      }
      expect(() => {
        validateNewUser(testUser)
      }).to.throw()
    })
  })
}
