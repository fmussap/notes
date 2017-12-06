import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'

const Header = ({ title }) => {
  const onLogout = () => {
    Accounts.logout()
  }
  return (
    <div className='header'>
      <div className='header__content'>
        <h1 className='header__title'>{title}</h1>
        <button className='button button--danger header__title' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
