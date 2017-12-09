import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

export class Header extends PureComponent {
  render () {
    return (
      <div className='header'>
        <div className='header__content'>
          <h1 className='header__title'>{this.props.title}</h1>
          <button className='button button--danger header__title' onClick={this.props.handleLogout}>Logout</button>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default withTracker((props) => {
  return {
    currentUser: Meteor.user(),
    handleLogout: () => Accounts.logout()
  }
})(Header)
