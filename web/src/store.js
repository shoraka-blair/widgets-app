import { createStore, combineReducers } from 'redux'

import { set, lensProp } from 'ramda'

const initialWidget = {
  name: '',
  cost: '',
  year: ''
}

const widget = (state=initialWidget, action) => {
  switch (action.type) {
    case 'SET_WIDGET_NAME':
      return set(lensProp('name'), action.payload, state)
    case 'SET_WIDGET_COST':
      return set(lensProp('cost'), action.payload, state)
    case 'SET_WIDGET_YEAR':
      return set(lensProp('year'), action.payload, state)
    case 'CLEAR_WIDGET':
      return {}
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    widget: widget
  })
)

export default store
