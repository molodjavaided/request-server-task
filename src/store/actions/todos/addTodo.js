import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
} from "../type";
import * as api from "../../../api/TodoFetchs";

export const addTodo = (title) => {
    return async (dispatch) => {
        dispatch({ type: ADD_TODO_REQUEST });
        try {
            const newTodo = await api.createTodo(title);
            dispatch({ type: ADD_TODO_SUCCESS, payload: newTodo });
        } catch (error) {
            dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
        }
    }
}