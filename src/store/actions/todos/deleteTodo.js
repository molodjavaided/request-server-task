import {
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
} from "../type";
import * as api from "../../../api/TodoFetchs";

export const deleteTodo = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_TODO_REQUEST, payload: id });
        try {
            await api.deleteTodo(id);
            dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
        } catch (error) {
            dispatch({ type: DELETE_TODO_FAILURE, payload: { id, error: error.message} });
        }
    }
}