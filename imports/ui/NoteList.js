import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session'

import { Notes } from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export class NoteList extends PureComponent {
  renderList () {
    if (this.props.notes.length < 1) {
      return <NoteListEmptyItem />
    }

    return this.props.notes.map((note) => {
      // console.log('notem', note)
      return (
        <NoteListItem note={note} key={note._id} />
      )
    })
  }
  render () {
    return (
      <div className='item-list'>
        <NoteListHeader />
        {this.renderList()}
      </div>
    )
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default withTracker((props) => {
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes')
  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return { ...note, selected: note._id === selectedNoteId }
    })
  }
})(NoteList)
