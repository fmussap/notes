import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import createBrowserHistory from 'history/createBrowserHistory'

import { routes, onAuthChange } from '../imports/routes'
import '../imports/startup/simple-schema-configuration'

const history = createBrowserHistory()

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
  if (!isAuthenticated) {
    Session.set('selectedNoteId', undefined)
  }
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
    Session.set('isNavOpen', false)
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')
  document.body.classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDom.render(routes, document.getElementById('app'))
})
