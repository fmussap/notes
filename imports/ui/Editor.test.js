/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
// import { MemoryRouter } from 'react-router-dom'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { Editor } from './Editor'
import { notes } from '../fixtures'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  let history
  let call

  beforeEach(() => {
    call = sinon.spy()
    history = {
      push: sinon.spy()
    }
  })
  describe('Editor', () => {
    it('should show "Pick or create a note" when there is no note and no NoteId', () => {
      const msg = 'Pick or create a note'
      const wrapper = shallow(
        <Editor call={call} history={history} />
      )
      expect(wrapper.find('p').text()).to.be.equal(msg)
    })

    it('should show "Note not found" when there is no note and it has NoteId', () => {
      const msg = 'Note not found'
      const selectedNoteId = '12345'
      const wrapper = shallow(
        <Editor call={call} history={history} selectedNoteId={selectedNoteId} />
      )
      expect(wrapper.find('p').text()).to.be.equal(msg)
    })

    it('should remove a note when the button "Delete note" is clicked', () => {
      const _id = notes[0]._id
      const wrapper = shallow(
        <Editor call={call} history={history} note={notes[0]} selectedNoteId={_id} />
      )
      wrapper.find('button').simulate('click')
      expect(call).to.have.been.calledWith('notes.remove', _id)
      call.getCall(0).args[2](undefined)
      expect(history.push).to.have.been.calledWith('/dashboard')
    })

    it('should update the body when the textarea change', () => {
      const _id = notes[0]._id
      const newBody = 'new body'
      const wrapper = shallow(
        <Editor call={call} history={history} note={notes[0]} selectedNoteId={_id} />
      )
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      })
      expect(wrapper.state('body')).to.be.equal(newBody)
      expect(call).to.have.been.calledWith('notes.update', _id, { body: newBody })
    })

    it('should update the title when the input change', () => {
      const _id = notes[0]._id
      const newTitle = 'new title'
      const wrapper = shallow(
        <Editor call={call} history={history} note={notes[0]} selectedNoteId={_id} />
      )
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      })
      expect(wrapper.state('title')).to.be.equal(newTitle)
      expect(call).to.have.been.calledWith('notes.update', _id, { title: newTitle })
    })

    it('should set state for the new note', () => {
      const _id = notes[0]._id
      const wrapper = shallow(
        <Editor call={call} history={history} note={undefined} selectedNoteId={_id} />
      )
      expect(wrapper.state('title')).to.be.equal('')
      wrapper.setProps({ note: notes[0] })
      expect(wrapper.state('title')).to.be.equal('title1')
    })
  })
}
