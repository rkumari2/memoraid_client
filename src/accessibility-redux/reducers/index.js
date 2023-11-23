import { combineReducers } from 'redux'
import { accessibilityReducer } from './accessibilityReducers'

const allReducers = combineReducers(
    {
        accessibility: accessibilityReducer
    }
)

export default allReducers
