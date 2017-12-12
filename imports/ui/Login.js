import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class Login extends PureComponent {
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

      props.loginWithPassword({ email }, password, (error) => {
        if (error) {
          this.setState({
            error: 'Unable to login. Please check email and password'
          })
        } else {
          this.setState({
            user: Meteor.user(),
            error: ''
          })
        }
      })
    }

    this.loginWithGoogle = () => {
      this.props.loginWithGoogle({
        requestPermissions: ['email']
      }, (error) => {
        if (error) {
          this.setState({
            error: 'Unable to login. Please check email and password'
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

  componentWillMount () {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard')
    }
  }

  render () {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Notes</h1>
          <div className='error-message'>
            {this.state.error
              ? <p>{this.state.error}</p>
              : undefined
            }
          </div>
          <button className='loginBtn loginBtn--google' onClick={this.loginWithGoogle}>
            Sign in with Google
          </button>
          <h5>or</h5>
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
            <button className='button' type='submit'>Login</button>
          </form>
          <Link to='/signup'>Don't have an account?</Link>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired
}

export default withTracker((props) => {
  return {
    loginWithPassword: Meteor.loginWithPassword,
    loginWithGoogle: Meteor.loginWithGoogle
  }
})(Login)
