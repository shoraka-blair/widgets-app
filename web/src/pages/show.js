import React from 'react'
import { connect } from 'react-redux'
import { get, remove } from '../model'
import { Card } from '../components'
import { Link } from 'react-router-dom'

class BuzzwordShow extends React.Component {
  componentDidMount () {
    this.props.getBuzzword(this.props.match.params.id)
  }
  render() {
    const props = this.props
    return (
      <Card>
        <h2>{props.buzzword.name}</h2>
        <Link className="link" to={`/buzzwords/${props.buzzword.id}/edit`}>Edit</Link>
        |
        <a className="link" href="#" onClick={props.removeBuzzword(props.buzzword, props.history)}>Remove</a>
      </Card>
    )

  }
}

const connector = connect(state => state, (dispatch) => {
  return {
    getBuzzword: (id) => get(id).then(buzzword => {
      dispatch({type: 'SET_BUZZWORD', payload: buzzword})
    }),
    removeBuzzword: (buzzword, history) => (e) => {
      if (confirm('Are you sure')) {
        remove(buzzword).then(res => {
          dispatch({type: 'CLEAR_BUZZWORD'})
          history.push('/')
        })
      }
    }
  }
})

export default connector(BuzzwordShow)
