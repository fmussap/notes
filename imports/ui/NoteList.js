import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'

import { Notes } from '../api/notes'
export class NoteList extends PureComponent {
  render () {
    return (
      <div>
        NoteList {this.props.notes.length}
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
