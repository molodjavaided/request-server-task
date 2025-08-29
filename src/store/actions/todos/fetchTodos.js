import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
} from "../type";
import * as api from "../../../api/TodoFetchs";


export const fetchTodos = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_TODOS_REQUEST });

        const { filters } = getState();

        try {
            const todos = await api.getTodos(
                filters.sortBy,
                filters.order,
                filters.searchTerm
            );
            dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
        } catch (error) {
            dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
        }
    };
};