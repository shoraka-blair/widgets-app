import React from 'react'
import { TextField, BasicButton } from '../components'
import { path } from 'ramda'

import { post, get, put } from '../model'

import { connect } from 'react-redux'

class BuzzwordForm extends React.Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getBuzzword(this.props.match.params.id)
    }
  }
  render() {
    const props = this.props
    return (
      <div className="pa4">
        <h2>Add/Edit Buzzword</h2>
        <form onSubmit={props.createOrUpdateBuzzword(props.buzzword, props.history)}>
          <TextField label="Name"
            help="name of buzzword"
            value={path(['buzzword', 'name'], props)}
            onChange={props.onChangeName}
          />
          <TextField label="Description"
            value={path(['buzzword', 'description'], props)}
            onChange={props.onChangeDescription}
            help="Provide a short description of the meaning of the buzzword."
          />
          <TextField
            label="Year"
            value={path(['buzzword', 'year'], props)}
            onChange={props.onChangeYear}
            optional={true}
            help="Year buzzword was coined."
          />
          <TextField
            label="Author"
            value={path(['buzzword', 'author'], props)}
            onChange={props.onChangeAuthor}
            help="creator of buzzword"
            optional={true}
          />
          <BasicButton>Add/Update Buzzword</BasicButton>
          <a className="link" href="#" onClick={() => props.history.goBack()}>Cancel</a>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapActionsToProps = (dispatch) => {
  return {
    getBuzzword: (id) => get(id).then(buzzword => {
      dispatch({type: 'SET_BUZZWORD', payload: buzzword})
    }),
    createOrUpdateBuzzword: (buzzword, history) => e => {
      e.preventDefault()
      if (buzzword.id) {
        put(buzzword)
          .then(buzzword => {
            if (buzzword.id) {
              // success in database
              dispatch({type:'CLEAR_BUZZWORD'})
              history.push('/')
            } else {
              alert('Could not save to the database')
            }
          })
          .catch(err => console.log(err.message))
      } else {
        post(buzzword)
          .then(buzzword => {
            if (buzzword.id) {
              // success in database
              dispatch({type:'CLEAR_BUZZWORD'})
              history.push('/')
            } else {
              alert('Could not save to the database')
            }
          })
          .catch(err => console.log(err.message))
      }

    },
    onChangeName: e => {
      dispatch({type: 'CHG_NAME', payload: e.target.value})
    },
    onChangeDescription: e => {
      dispatch({type: 'CHG_DESC', payload: e.target.value})
    },
    onChangeYear: e => {
      dispatch({type: 'CHG_YEAR', payload: e.target.value})
    },
    onChangeAuthor: e => {
      dispatch({type: 'CHG_AUTHOR', payload: e.target.value})
    }
  }
}
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(BuzzwordForm)
