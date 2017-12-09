import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const NoteListItem = (props) => {
  const { title, updatedAt } = { ...props.note }
  return (
    <div>
      <h5>{title || 'Untitled note'}</h5>
      <p>{moment(updatedAt).format('DD/M/YY')}</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
}

export default NoteListItem
