import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import reducer from './reducer'

const store = createStore(combineReducers(reducer), applyMiddleware(logger, thunk))

export default store