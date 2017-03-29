import React from 'react'

import { connect } from 'react-redux'

import fetch from 'isomorphic-fetch'
import Card from '../components/card'

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
        <nav>
          <Link>Edit</Link>
          <a>Remove</a>
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
