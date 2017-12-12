import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session'

export class NoteListItem extends PureComponent {
  constructor () {
    super()

    this.handleClick = () => {
      this.props.Session.set('selectedNoteId', this.props.note._id)
    }
  }

  render () {
    const { title, updatedAt, selected } = { ...this.props.note }
    const className = selected ? 'item item--selected' : 'item'
    return (
      <div className={className} onClick={this.handleClick}>
        <h5 className='item__title'>{title || 'Untitled note'}</h5>
        <p className='item__date'>{moment(updatedAt).format('DD/M/YY')}</p>
      </div>
    )
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker((props) => {
  return {
    Session
  }
})(NoteListItem)
