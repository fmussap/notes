import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
// import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export class Header extends PureComponent {
  constructor (props) {
    super()

    this.handleClick = props.handleClick
  }
  render () {
    const headerImg = this.props.isNavOpen ? '/images/x.svg' : '/images/bars.svg'
    return (
      <div className='header'>
        <div className='header__content'>
          <img src={headerImg} className='header__img' onClick={this.handleClick} />
          <h1 className='header__title'>{this.props.title}</h1>
          <button className='button button--danger header__title' onClick={this.props.handleLogout}>Logout</button>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default withTracker((props) => {
  return {
    // currentUser: Meteor.user(),
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen'),
    handleClick: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
  }
})(Header)
