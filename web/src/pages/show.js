import React from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import fetch from 'isomorphic-fetch'
import Card from '../components/card'

const removeWidget = (widget) => {
  return fetch(`http://localhost:5000/widgets/${widget.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    body: JSON.stringify(widget)
  }).then(res => res.json())
}

class WidgetShow extends React.Component {
  componentDidMount() {
    fetch(`http://localhost:5000/widgets/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(widget => this.props.dispatch({type: 'SET_WIDGET', payload: widget }))
  }
  render() {
    const widget = this.props.widget
    return (
      <Card
        title={widget.name}
        description={`Year: ${widget.year}, Cost: $ ${widget.cost}`}>
        <nav className="tc">
          <Link className="ph3" to={`/widgets/${widget.id}/edit`}>Edit</Link>
          |
          <a href="#" className="ph3" onClick={
            event => {
              if (confirm('Are you sure?')) {
                removeWidget(this.props.widget)
                  .then(res => {
                    this.props.dispatch({type: 'CLEAR_WIDGET'})
                    this.props.history.push('/')
                  })
              }
            }
          }>Remove</a>
        </nav>
      </Card>
    )
  }
}

const connector = connect((state) => {
  return {
    widget: state.widget
  }
})

export default connector(WidgetShow)
