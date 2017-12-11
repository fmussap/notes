/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import moment from 'moment'

import { NoteListItem } from './NoteListItem'
import { notes } from '../fixtures'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('NoteListItem', () => {
    let Session
    beforeEach(() => {
      Session = {
        set: sinon.spy()
      }
    })

    it('should get the title and the updated date', () => {
      const note = notes[0]
      const wrapper = shallow(
        <NoteListItem note={note} Session={Session} />
      )
      const msgTitle = wrapper.find('h5').text()
      const msgupdatedAt = wrapper.find('p').text()
      expect(note.title).to.be.equal(msgTitle)
      expect(moment(note.updatedAt).format('DD/M/YY')).to.be.equal(msgupdatedAt)
    })

    it('should get the default title if there is no title', () => {
      const note = notes[1]
      const msg = 'Untitled note'
      const wrapper = shallow(
        <NoteListItem note={note} Session={Session} />
      )
      const msgTitle = wrapper.find('h5').text()
      expect(msg).to.be.equal(msgTitle)
    })

    it('should call Session.set onClick', () => {
      const note = notes[0]
      const wrapper = shallow(
        <NoteListItem note={note} Session={Session} />
      )

      wrapper.simulate('click')
      expect(Session.set).to.have.been.calledWith('selectedNoteId', note._id)
    })
  })
}
