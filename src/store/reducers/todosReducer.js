import {
    FETCH_TODOS_SUCCESS,
    ADD_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
} from "../actions/type";

const initialState = [];

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_SUCCESS:
            return action.payload;
        case ADD_TODO_SUCCESS:
            return [...state, action.payload];
        case UPDATE_TODO_SUCCESS:
            return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
        case DELETE_TODO_SUCCESS:
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;
    }
}