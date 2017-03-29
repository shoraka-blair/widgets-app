import React from 'react'

import TextField from '../components/text-field'
import BasicButton from '../components/basic-button'

import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'

const postWidget = (widget) => fetch('http://localhost:5000/widgets', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(widget)
})


const WidgetForm = (props) => {
  return (
    <div>
      <h2>Add/Edit Widget</h2>
      <form onSubmit={props.submit(props.history, props.widget)}>
        <TextField
          label="Name"
          value={pathOr('', ['widget','name'], props)}
          onChange={props.changeName}
          help="Name of boat part"
          optional={false}
        />
        <TextField
          label="Cost"
          value={pathOr('', ['widget','cost'], props)}
          onChange={props.changeCost}
          help="What does this part cost in dollars"
          optional={false}
          width="25"
        />
        <TextField
          label="Year"
          value={pathOr('', ['widget','year'], props)}
          onChange={props.changeYear}
          help="When was this part made"
          optional={true}
          width="25"
        />

        <BasicButton
          backgroundColor="dark-blue"
          color="white-80"
        >Create/Update Widget</BasicButton>
        <BasicButton>Cancel</BasicButton>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  widget: state.widget
})

const mapActionsToProps = (dispatch) => ({
  changeName: (e) => dispatch({ type: 'SET_WIDGET_NAME', payload: e.target.value }),
  changeCost: (e) => dispatch({ type: 'SET_WIDGET_COST', payload: e.target.value }),
  changeYear: (e) => dispatch({ type: 'SET_WIDGET_YEAR', payload: e.target.value }),
  submit: (history, widget) => (e) => {
    e.preventDefault()
    postWidget(widget)
      .then(res => res.json()).then(res => {
        // clear our widget memory from store
        dispatch({ type: 'CLEAR_WIDGET'})
        // navigate to a list view
        history.push('/')

      }).catch(err => console.log(err.message))
  }


})
const connector = connect(mapStateToProps, mapActionsToProps)


export default connector(WidgetForm)
