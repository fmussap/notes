/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import moment from 'moment'

import NoteListItem from './NoteListItem'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('NoteListItem', () => {
    it('should get the title and the updated date', () => {
      const note = { title: 'my title', updatedAt: 1486137505429 }
      const wrapper = shallow(
        <NoteListItem note={note} />
      )
      const msgTitle = wrapper.find('h5').text()
      const msgupdatedAt = wrapper.find('p').text()
      expect(note.title).to.be.equal(msgTitle)
      expect(moment(note.updatedAt).format('DD/M/YY')).to.be.equal(msgupdatedAt)
    })
    it('should get the default title if there is no title', () => {
      const title = 'Untitled note'
      const note = { updatedAt: 1486137505429 }
      const wrapper = shallow(
        <NoteListItem note={note} />
      )
      const msgTitle = wrapper.find('h5').text()
      expect(title).to.be.equal(msgTitle)
    })
  })
}
