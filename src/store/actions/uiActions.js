import {
    START_EDITTING,
    CANCEL_EDITTING,
} from "./type";

export const startEditing = (id) => {
    return { type: START_EDITTING, payload: id };
};

export const cancelEditing = () => {
    return { type: CANCEL_EDITTING };
};