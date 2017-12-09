import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class Signup extends Component {
  constructor (props) {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      user: {}
    }

    this.handleEmail = (e) => {
      const email = e.target.value
      this.setState({ email })
    }

    this.handlePassword = (e) => {
      const password = e.target.value
      this.setState({ password })
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      const email = this.state.email
      const password = this.state.password

      if (password.length < 8) {
        return this.setState({ error: 'Password must contain at least 8 characters long' })
      }

      props.createUser({ email, password }, (error) => {
        if (error) {
          this.setState({
            error: error.reason
          })
        } else {
          this.setState({
            user: Meteor.user(),
            error: ''
          })
        }
      })
    }
  }

  render () {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Join</h1>
          <div className='error-message'>
            {this.state.error
              ? <p>{this.state.error}</p>
              : undefined
            }
          </div>
          <form className='boxed-view__form' onSubmit={this.handleSubmit} noValidate>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleEmail}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <button className='button' type='submit'>Create account</button>
          </form>
          <Link to='/'>Have an account?</Link>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default withTracker((props) => {
  return {
    createUser: Accounts.createUser
  }
})(Signup)
