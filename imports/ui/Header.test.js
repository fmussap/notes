/* eslint no-unused-expressions: */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { expect } from 'meteor/practicalmeteor:chai'
import { spies } from 'meteor/practicalmeteor:sinon'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

import { Header } from './Header'

configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('Header', () => {
    const title = 'Test title'

    it('should use title prop as a h1 text', () => {
      const wrapper = mount(<Header title={title} handleLogout={() => null} />)
      const headerTitle = wrapper.find('h1.header__title').text()
      expect(headerTitle).to.be.equal(title)
    })

    it('should call the handleLogout onClick', () => {
      spies.create('handleLogout')
      const wrapper = mount(<Header title={title} handleLogout={spies.handleLogout} />)
      wrapper.find('button').simulate('click')
      expect(spies.handleLogout).to.have.been.called
    })
  })
}
