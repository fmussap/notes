/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { NoteList } from './NoteList'
import { notes } from '../fixtures'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('NoteList', () => {
    it('should render NoteListItem for each note', () => {
      const wrapper = mount(
        <MemoryRouter>
          <NoteList notes={notes} />
        </MemoryRouter>
      )
      expect(wrapper.find('NoteListItem').length).to.be.equal(2)
      expect(wrapper.find('NoteListEmptyItem').length).to.be.equal(0)
    })
    it('should render NoteListEmptyItem if there is no note', () => {
      const wrapper = mount(
        <MemoryRouter>
          <NoteList notes={[]} />
        </MemoryRouter>
      )

      expect(wrapper.find('NoteListItem').length).to.be.equal(0)
      expect(wrapper.find('NoteListEmptyItem').length).to.be.equal(1)
    })
  })
}
