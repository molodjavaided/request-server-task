import { SET_SEARCH_TERM, SET_SORT_ORDER } from "../actions/filterActions";

const initialState = {
    searchTerm: "",
    sortBy: "title",
    order: "desc",
};

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        case SET_SORT_ORDER:
            return {
                ...state,
                sortBy: action.payload.path,
                order: action.payload.order
            };
        default:
            return state;
    }
}