export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const setSearchTerm = (searchTerm) => {
    return { type: SET_SEARCH_TERM, payload: searchTerm };
};

export const setSortOrder = (path, order) => {
    return { type: SET_SORT_ORDER, payload: { path, order } };
};

export const toggleSortOrder = () => {
    return (dispatch, getState) => {
        const {filters} = getState();
        const newOrder = filters.order === "desc" ? "asc" : "desc";
        dispatch(setSortOrder('title', newOrder));
    }
}