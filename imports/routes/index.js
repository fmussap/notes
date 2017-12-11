import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const history = createBrowserHistory()
const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  // const isAuthenticatedPage = authenticatedPages.includes(pathname)
  // const isAuthenticatedPage2 = /^(\/dashboard)/.test(pathname)
  const isAuthenticatedPage = authenticatedPages.some((page) => {
    const path = `^(\\${page})`
    const regex = new RegExp(path)
    return regex.test(pathname)
  })
  // const isAuthenticatedPage = /[^(dashboard)]/.test(pathname)

  // console.log('isUnauthenticatedPage', isUnauthenticatedPage)
  // console.log('isAuthenticatedPage', isAuthenticatedPage2)
  // console.log('isAuthenticated', isAuthenticated)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
  }
}

export const routes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/:id' component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
