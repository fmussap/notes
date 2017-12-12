import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'

export class NoteListHeader extends PureComponent {
  constructor (props) {
    super()

    this.handleClick = () => {
      props.meteorCall('notes.insert', (err, id) => {
        if (!err) {
          props.Session.set('selectedNoteId', id)
        }
      })
    }
  }
  render () {
    return (
      <div className='item-list__header'>
        <button className='button' onClick={this.handleClick}>
          Create note
        </button>
      </div>
    )
  }
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker((props) => {
  Meteor.subscribe('notes')
  return {
    meteorCall: Meteor.call,
    Session: Session
  }
})(NoteListHeader)
