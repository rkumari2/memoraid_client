import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import allReducers from '../reducers'

const componsedFunctions = composeWithDevTools(... [applyMiddleware(thunk)])

const store = createStore(
    allReducers, 
    componsedFunctions
)

export default store;
