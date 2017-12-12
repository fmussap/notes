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

  let meteorCall
  let Session

  beforeEach(() => {
    meteorCall = sinon.spy()
    Session = {
      set: sinon.spy()
    }
  })

  describe('NoteListItemHeader', () => {
    it('should get the arg "notes.insert" onClick', () => {
      const arg = 'notes.insert'
      const newId = 'newId'
      const wrapper = shallow(
        <NoteListHeader meteorCall={meteorCall} Session={Session} />
      )
      wrapper.find('button').simulate('click')
      expect(meteorCall).to.have.been.calledWith(arg)
      meteorCall.getCall(0).args[1](undefined, newId)
      expect(Session.set).to.have.been.calledWith('selectedNoteId', newId)
    })

    it('should not set Session when has an err on insert', () => {
      const arg = 'notes.insert'
      const newId = 'newId'
      const wrapper = shallow(
        <NoteListHeader meteorCall={meteorCall} Session={Session} />
      )
      wrapper.find('button').simulate('click')
      expect(meteorCall).to.have.been.calledWith(arg)
      meteorCall.getCall(0).args[1]({}, newId)
      expect(Session.set).to.have.not.been.called
    })
  })
}
