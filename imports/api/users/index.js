import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const validateNewUser = (user) => {
  if (user.emails) {
    const email = user.emails[0].address
    const newUser = new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    })

    newUser.validate({ email })
  }
  return true
}

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser)
}
