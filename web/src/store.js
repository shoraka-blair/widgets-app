import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { set, lensProp } from 'ramda'

const initialWidget = {
  name: '',
  cost: '',
  year: ''
}

const widgets = (state=[], action) => {
  switch (action.type) {
    case 'LOAD_WIDGETS':
      return action.payload
    default:
      return state
  }
}


const widget = (state=initialWidget, action) => {
  switch (action.type) {
    case 'SET_WIDGET':
      return action.payload
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
    widget: widget,
    widgets: widgets
  }),
  applyMiddleware(ReduxThunk)
)

export default store
