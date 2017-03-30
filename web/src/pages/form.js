import React from 'react'

import TextField from '../components/text-field'
import BasicButton from '../components/basic-button'

import { connect } from 'react-redux'
import { pathOr } from 'ramda'

import * as widget from '../lib/widgets'

//const WidgetForm = (props) => {
const WidgetForm = (props) => {
  return (
    <div>
      <h2>Add/Edit Widget</h2>
      <form onSubmit={props.submit(props.history, pathOr(null, ['widget', 'id'], props))}>
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
        <a className="link" href="#" onClick={e => props.history.goBack() }>Cancel</a>
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
  submit: (history, id) => (e) => {
    e.preventDefault()

    if (id) {
      // update or putWidget
      dispatch(widget.put).then(res => {
        history.push('/widgets/' + id)
      })
    } else {
      dispatch(widget.post).then(res => {
        history.push('/')
      })
    }
  }


})
const connector = connect(mapStateToProps, mapActionsToProps)


export default connector(WidgetForm)
