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
          Session.set('selectedNoteId', id)
        }
      })
    }
  }
  render () {
    return (
      <div>
        <button className='button' onClick={this.handleClick}>
          Create note
        </button>
      </div>
    )
  }
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default withTracker((props) => {
  Meteor.subscribe('notes')
  return {
    meteorCall: Meteor.call
  }
})(NoteListHeader)
