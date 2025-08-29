import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from 'redux-thunk';
import { todosReducer, filtersReducer, uiReducer } from "./reducers";

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer,
    ui: uiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));