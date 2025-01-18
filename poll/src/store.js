import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import reducer from './reducers'
import logger from './middleware/logger'

export default function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(thunk, logger)
  )
}
