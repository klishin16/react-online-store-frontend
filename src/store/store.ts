import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import reducers from './reducers/reducers'
import {composeWithDevTools} from "redux-devtools-extension";
const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
