import {
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
} from "../type";
import * as api from "../../../api/TodoFetchs";

export const updateTodo = (id, newTitle) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_TODO_REQUEST, payload: id });
        try {
           const updatedTodo = await api.updateTodo(id, newTitle);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
        } catch (error) {
            dispatch({ type: UPDATE_TODO_FAILURE, payload: { id, error: error.message} });
        }
    }
}