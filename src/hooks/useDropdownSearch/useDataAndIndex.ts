import { useReducer } from "react";
import { DataAndIndex, DataAndIndexAction } from "./types";
import { AutocompleteData } from "$types/common";

type ReturnValueType = [AutocompleteData, number, Function];

export default function useDataAndIndex(): ReturnValueType {
    const [{data, index}, dispatch] = useReducer(reducer, {data: [], index: 0});
    return [data, index, dispatch];
}

function reducer(state: DataAndIndex, action: DataAndIndexAction) {
    switch (action.type) {
        case "reinit": {
            return { data: [], index: 0 };
        } break;
        case "set-data": {
            return { data: action.data, index: 0 };
        } break;
        case "set-index": {
            return { data: state.data, index: action.index };
        } break;
        default: {
            throw new Error();
        } break;
    }
}
