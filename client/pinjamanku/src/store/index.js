import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import borrowerReducer from './Borrower/reducer'
import landerReducer from './Lander/reducer'
import pinjamanReducer from './Pinjaman/reducer'

const store = createStore(combineReducers({
    // lander: landerReducer,
    borrower: borrowerReducer,
    // pinjamanku: pinjamanReducer
}), applyMiddleware(logger, thunk))

export default store