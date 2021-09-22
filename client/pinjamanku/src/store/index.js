import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import userReducer from './user/reducer'
import pinjamanReducer from './Pinjaman/reducer'

const store = createStore(combineReducers({
    user: userReducer,
    pinjamanku: pinjamanReducer
}), applyMiddleware(logger, thunk))

export default store