import { createStore, combineReducers } from 'redux'

import { set, lensProp } from 'ramda'

const buzzwords = (state=[], action) => {
  switch(action.type) {
    case 'SET_BUZZWORDS':
      return action.payload
    default:
      return state
  }
}

const buzzword = (state={name:'', description: '', year: '', author: ''}, action) => {
  switch(action.type) {
    case 'SET_BUZZWORD':
      return action.payload
    case 'CHG_NAME':
      return set(lensProp('name'), action.payload, state)
    case 'CHG_DESC':
      return set(lensProp('description'), action.payload, state)
    case 'CHG_YEAR':
      return set(lensProp('year'), action.payload, state)
    case 'CHG_AUTHOR':
      return set(lensProp('author'), action.payload, state)
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    buzzword,
    buzzwords
  })
)

export default store
