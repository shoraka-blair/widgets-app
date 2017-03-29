import React from 'react'

import { map } from 'ramda'
import ListItem from '../components/list-item'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

class Widgets extends React.Component {
  componentDidMount () {
    fetch('http://localhost:5000/widgets')
      .then(res => res.json())
      .then(widgets => this.props.dispatch({
        type: 'LOAD_WIDGETS',
        payload: widgets
      }))
  }
  render() {
    const props = this.props
    const listWidget = widget => {
      return (
        <ListItem
          key={widget.id}
          title={widget.name}
          description={`Year: ${widget.year}, Cost: $ ${widget.cost}`}
          linkUrl={`/widgets/${widget.id}`}
          linkDescription="Details"
        />
      )
    }
    return (
      <div>
        <ul className="list">
          {map(listWidget, props.widgets)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  widgets: state.widgets
})

const connector = connect(mapStateToProps)

export default connector(Widgets)
