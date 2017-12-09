/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { NoteListHeader } from './NoteListHeader'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('NoteListItemHeader', () => {
    it('should get the arg "notes.insert" onClick', () => {
      const spy = sinon.spy()
      const arg = 'notes.insert'
      const wrapper = shallow(
        <NoteListHeader meteorCall={spy} />
      )
      wrapper.find('button').simulate('click')
      expect(spy).to.have.been.calledWith(arg)
    })
  })
}
