import React, { PureComponent } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session'
import { withRouter } from 'react-router-dom'

import { Notes } from '../api/notes'

export class Editor extends PureComponent {
  constructor (props) {
    super()
    this.state = {
      title: '',
      body: ''
    }

    this.handleTextArea = (e) => {
      const body = e.target.value
      this.setState({ body })
      this.props.call('notes.update', this.props.note._id, {
        body
      })
    }

    this.handleInput = (e) => {
      const title = e.target.value
      this.setState({ title })
      this.props.call('notes.update', this.props.note._id, {
        title
      })
    }

    this.handleClick = () => {
      this.props.call('notes.remove', this.props.note._id, (err) => {
        if (!err) {
          Session.set('selectedNoteId', undefined)
          props.history.push('/dashboard')
        }
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }

  render () {
    if (this.props.note) {
      return (
        <div className='editor'>
          <input className='editor__title'
            value={this.state.title}
            placeholder='Your title here'
            onChange={this.handleInput}
          />
          <textarea
            className='editor__body'
            value={this.state.body}
            placeholder='Your note here'
            onChange={this.handleTextArea}
          />
          <div>
            <button
              className='button button--danger'
              onClick={this.handleClick}
            >
            Delete note
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className='editor'>
        <p className='editor__message'>
          {this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note'}
        </p>
      </div>
    )
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withTracker((props) => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    history: props.history
  }
})(withRouter(Editor))
