import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes')

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId })
  })
}

Meteor.methods({
  'notes.insert' () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const id = Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
    return id
  },
  'notes.remove' (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const testId = new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    })

    testId.validate({ _id })
    Notes.remove({ _id, userId: this.userId })
  },
  'notes.update' (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const testUpdate = new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    })

    testUpdate.validate({ _id, ...updates })
    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    })
  }
})
