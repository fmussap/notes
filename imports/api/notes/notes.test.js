import { expect } from 'meteor/practicalmeteor:chai'
import { Meteor } from 'meteor/meteor'
import { Notes } from './index'

if (Meteor.isServer) {
  const notesInsert = Meteor.server.method_handlers['notes.insert']
  const notesRemove = Meteor.server.method_handlers['notes.remove']
  const notesUpdate = Meteor.server.method_handlers['notes.update']
  const notes = Meteor.server.publish_handlers.notes

  describe('notes', () => {
    const nodeOne = {
      _id: 'testeNoteId1',
      body: 'My body',
      title: 'My title',
      updatedAt: 0,
      userId: 'testeUserId1'
    }

    const nodeTwo = {
      _id: 'testeNoteId2',
      body: 'My body2',
      title: 'My title2',
      updatedAt: 0,
      userId: 'testeUserId2'
    }

    const updateTitle = {
      title: 'My title is not the same'
    }

    const updateTitle2 = {
      header: 'I dont have it'
    }

    beforeEach(function () {
      Notes.remove({})
      Notes.insert(nodeOne)
      Notes.insert(nodeTwo)
    })

    describe('Insert', () => {
      it('notesInsert should be a function', () => {
        expect(notesInsert).to.be.a('function')
      })

      it('notesInsert() without userId should throw an error', () => {
        expect(() => notesInsert()).to.throw()
      })

      it('notesInsert() with this.userId should insert a note', () => {
        const userId = 'testid'
        const _id = notesInsert.apply({ userId })
        expect(Notes.findOne({ _id, userId })._id).to.be.equal(_id)
      })
    })

    describe('Remove', () => {
      it('notesRemove should be a function', () => {
        expect(notesRemove).to.be.a('function')
      })

      it('notesRemove(_id) without userId should throw an error', () => {
        const _id = nodeOne._id
        expect(() => notesRemove(_id)).to.throw()
      })

      it('notesRemove() without _id should throw an error', () => {
        const userId = nodeOne.userId
        expect(() => notesRemove.apply({ userId })).to.throw()
      })

      it('notesRemove("testeNoteId1") should remove a note', () => {
        const userId = nodeOne.userId
        const _id = nodeOne._id
        notesRemove.apply({ userId }, [_id])
        expect(Notes.findOne({ _id, userId })).to.be.equal(undefined)
      })
    })
    describe('Update', () => {
      it('notesUpdate should be a function', () => {
        expect(notesUpdate).to.be.a('function')
      })

      it('notesUpdate(_id) without userId should throw an error', () => {
        const _id = nodeOne._id
        expect(() => notesUpdate(_id)).to.throw()
      })

      it('notesUpdate() without _id should throw an error', () => {
        const userId = nodeOne.userId
        expect(() => notesUpdate.apply({ userId })).to.throw()
      })

      it('notesUpdate(_id, updateTitle) should update the title', () => {
        const _id = nodeOne._id
        const userId = nodeOne.userId
        notesUpdate.apply({ userId }, [_id, updateTitle])
        expect(Notes.findOne({ _id, userId })).to.be.include(updateTitle, { body: nodeOne.body })
      })

      it('notesUpdate(_id, updateTitle) should not update if userId is not equal to creators userId', () => {
        const _id = nodeOne._id
        const userId = nodeOne.userId
        notesUpdate.apply({ userId: 'otherUserId' }, [_id, updateTitle])
        expect(Notes.findOne({ _id, userId })).to.be.not.include(updateTitle, { body: nodeOne.body })
      })

      it('notesUpdate(_id, updateTitle2) should throw an error, it has a invalid property', () => {
        const _id = nodeOne._id
        const userId = nodeOne.userId
        expect(() => notesUpdate.apply({ userId }, [_id, updateTitle2])).to.throw()
      })

      it('should not find notes for a different user', () => {
        const userId = nodeOne.userId
        expect(notes.apply({ userId }).fetch()).to.be.not.include(nodeTwo)
      })

      it('should find notes for a same user', () => {
        const userId = nodeOne.userId
        expect(notes.apply({ userId }).fetch()).to.be.include(nodeOne)
      })
    })
  })
}
