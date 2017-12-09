/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { NoteList } from './NoteList'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  const notes = [
    {
      _id: 'noteId1',
      title: 'title1',
      body: '',
      updatedAt: 0,
      userId: 'userId1'
    },
    {
      _id: 'noteId2',
      title: '',
      body: 'some body',
      updatedAt: 0,
      userId: 'userId2'
    }
  ]
  chai.use(sinonChai)
  describe('NoteList', () => {
    it('should render NoteListItem for each note', () => {
      const wrapper = shallow(
        <NoteList notes={notes} />
      )

      expect(wrapper.find('NoteListItem').length).to.be.equal(2)
      expect(wrapper.find('NoteListEmptyItem').length).to.be.equal(0)
    })
    it('should render NoteListEmptyItem if there is no note', () => {
      const wrapper = shallow(
        <NoteList notes={[]} />
      )
      expect(wrapper.find('NoteListItem').length).to.be.equal(0)
      expect(wrapper.find('NoteListEmptyItem').length).to.be.equal(1)
    })
  })
}
