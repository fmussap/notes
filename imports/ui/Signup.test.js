/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { Signup } from './Signup'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('Signup', () => {
    it('should show an error message', () => {
      const wrapper = shallow(
        <Signup createUser={() => null} />
      )
      const error = 'this is not working'
      wrapper.setState({ error })
      const msg = wrapper.find('p').text()
      expect(msg).to.be.equal(error)
    })
    it('should call createUser with the form data', () => {
      const email = 'fmussap@yahoo.com'
      const password = '12345678'
      const spy = sinon.spy()
      const wrapper = shallow(
        <Signup createUser={spy} />
      )

      wrapper.setState({ email, password })
      wrapper.find('form').simulate('submit', { preventDefault () {} })
      expect(spy).to.have.been.calledWith({ email, password })
    })
    it('should have an error message with password < 8 char', function () {
      const errorMessage = 'Password must contain at least 8 characters long'
      const spy = sinon.spy()
      const wrapper = shallow(
        <Signup createUser={spy} />
      )

      wrapper.find('form').simulate('submit', { preventDefault () {} })
      // spy.getCall(0).args[1]({})
      expect(wrapper.state('error')).to.be.equal(errorMessage)
    })
    it('should set createUser callback error', function () {
      const email = 'fmussapyahoo.com'
      const password = '12345678'
      const reason = 'this is not working'
      const spy = sinon.spy()
      const wrapper = shallow(
        <Signup createUser={spy} />
      )

      wrapper.setState({ email, password })
      wrapper.find('form').simulate('submit', { preventDefault () {} })
      spy.getCall(0).args[1]({ reason })
      expect(wrapper.state('error')).to.be.equal(reason)
    })
  })
}
