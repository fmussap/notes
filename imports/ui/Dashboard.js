import React from 'react'
import { Session } from 'meteor/session'

import Header from './Header'
import NotesList from './NoteList'
import Editor from './Editor'

const Dashboard = (props) => {
  // console.log('history', props)
  const param = props.match.params.id
  if (param) {
    Session.set('selectedNoteId', param)
  }
  return (
    <div>
      <Header title='Dashboard' />
      <div className='page-content'>
        <NotesList />
        <Editor />
      </div>
    </div>
  )
}

export default Dashboard
