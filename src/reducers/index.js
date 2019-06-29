import { combineReducers } from 'redux'

import dbReducer from './dbReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  dbReducer,
  authReducer
})

export default rootReducer
