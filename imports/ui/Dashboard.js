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
        <div className='page-content__sidebar'>
          <NotesList />
        </div>
        <div className='page-content__main' >
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
