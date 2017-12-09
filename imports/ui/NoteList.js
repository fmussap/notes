import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'

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
      <div>
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
  Meteor.subscribe('notes')
  return {
    notes: Notes.find().fetch()
  }
})(NoteList)
