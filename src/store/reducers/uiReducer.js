import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    START_EDITTING,
    CANCEL_EDITTING,
} from "../actions/type";

import { SET_SEARCH_TERM } from '../actions/filterActions';

const initialState = {
    isLoading: false,
    isAdding: false,
    updatingIds: [],
    deletingIds: [],
    editingId: null,
    error: null,
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return { ...state, isLoading: true, error: null }
        case FETCH_TODOS_SUCCESS:
            return { ...state, isLoading: false, error: null }
        case FETCH_TODOS_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case ADD_TODO_REQUEST:
            return { ...state, isAdding: true, error: null }
        case ADD_TODO_SUCCESS:
            return { ...state, isAdding: false, error: null }
        case ADD_TODO_FAILURE:
            return { ...state, isAdding: false, error: action.payload }

        case UPDATE_TODO_REQUEST:
            return { ...state, updatingIds: [...state.updatingIds, action.payload], error: null }

        case UPDATE_TODO_SUCCESS:
            return { ...state,
        updatingIds: state.updatingIds.filter(id => id !== action.payload.id),
        editingId: null,
        error: null  }

        case UPDATE_TODO_FAILURE:
            return { ...state,
        updatingIds: state.updatingIds.filter(id => id !== action.payload.id),
        error: action.payload.error }

        case DELETE_TODO_REQUEST:
            return { ...state, deletingIds: [...state.deletingIds, action.payload], error: null }
        case DELETE_TODO_SUCCESS:
            return { ...state, deletingIds: state.deletingIds.filter((id) => id !== action.payload), error: null }
        case DELETE_TODO_FAILURE:
            return { ...state,
        deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
        error: action.payload.error }

        case START_EDITTING:
            return { ...state, editingId: action.payload, error: null }
        case CANCEL_EDITTING:
            return { ...state, editingId: null, error: null }
        default:
            return state;
    }
}