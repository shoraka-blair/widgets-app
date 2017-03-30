import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { remove } from '../lib/widgets'
import Card from '../components/card'

const WidgetShow = (props) => {
  const widget = props.widget
  return (
    <Card
      title={widget.name}
      description={`Year: ${widget.year}, Cost: $ ${widget.cost}`}>
      <nav className="tc">
        <Link className="ph3" to={`/widgets/${widget.id}/edit`}>Edit</Link>
        |
        <a href="#" className="ph3" onClick={props.remove(props.history)}>Remove</a>
      </nav>
    </Card>
  )
}

const connector = connect((state) => {
  return {
    widget: state.widget
  }
}, dispatch => {
  return {
    remove: history => e => {
      if (confirm('Are you sure?')) {
        dispatch(remove).then(_ => history.push('/'))
      }
    }
  }
})

export default connector(WidgetShow)
