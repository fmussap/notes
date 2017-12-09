import React from 'react'

import Header from './Header'
import NotesList from './NoteList'

const Dashboard = () => {
  return (
    <div>
      <Header title='Dashboard' />
      <div className='page-content'>
        <NotesList />
      </div>
    </div>
  )
}

export default Dashboard
