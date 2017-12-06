import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      user: {}
    }

    this.handleSubmit = (e) => {
      const email = e.target.email.value
      const password = e.target.password.value

      e.preventDefault()
      Meteor.loginWithPassword({ email }, password, (error) => {
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
      Meteor.loginWithGoogle({
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
          <h1>Login</h1>
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
            <input type='email' name='email' placeholder='Email' />
            <input type='password' name='password' placeholder='Password' />
            <button className='button' type='submit'>Login</button>
          </form>
          <Link to='/signup'>Don't have an account?</Link>
        </div>
      </div>
    )
  }
}

export default Login
