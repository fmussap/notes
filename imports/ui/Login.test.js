/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
// import { MemoryRouter } from 'react-router-dom'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { Login } from './Login'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  chai.use(sinonChai)
  describe('Login', () => {
    it('should show an error message', () => {
      const wrapper = shallow(
        <Login loginWithPassword={() => null} loginWithGoogle={() => null} />
      )
      const error = 'this is not working'
      wrapper.setState({ error })
      const msg = wrapper.find('p').text()
      expect(msg).to.be.equal(error)
    })
    it('should call loginWithPassword with the form data', () => {
      const email = 'fmussap@yahoo.com'
      const password = '12345678'
      const spy = sinon.spy()
      const wrapper = shallow(
        <Login loginWithPassword={spy} loginWithGoogle={() => null} />
      )

      wrapper.setState({ email, password })
      wrapper.find('form').simulate('submit', { preventDefault () {} })
      expect(spy).to.have.been.calledWith({ email }, password)
    })
    it('should set loginWithPassword callback error', function () {
      const errorMessage = 'Unable to login. Please check email and password'
      const spy = sinon.spy()
      const wrapper = shallow(
        <Login loginWithPassword={spy} loginWithGoogle={() => null} />
      )

      wrapper.find('form').simulate('submit', { preventDefault () {} })
      spy.getCall(0).args[2]({})
      expect(wrapper.state('error')).to.be.equal(errorMessage)
    })
  })
}
