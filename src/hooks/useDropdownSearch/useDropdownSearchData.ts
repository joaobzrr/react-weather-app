import { useReducer } from "react";
import { DropdownSearchData, DropdownSearchAction } from "./types";
import { AutocompleteData } from "$types/common";

const initialState: DropdownSearchData = {
    data: [],
    index: -1,
    inputText: "",
    typedText: ""
};

type ReturnValueType = [AutocompleteData, number, string, Function];

export default function useDropdownSearchData(): ReturnValueType {
    const [{data, index, inputText}, dispatch] = useReducer(reducer, initialState);
    return [data, index, inputText, dispatch];
}

function reducer(state: DropdownSearchData, action: DropdownSearchAction) {
    switch (action.type) {
        case "FETCHED_AUTOCOMPLETE_DATA": {
            return { ...state, data: action.data, index: -1 };
        } break;
        case "CHANGED_HIGHLIGHTED_ENTRY": {
            const text = action.index === -1 ? state.typedText : state.data[action.index].city;
            return { ...state, index: action.index, inputText: text };
        } break;
        case "INPUT_VALUE_CHANGED": {
            return (action.value === "") ? initialState : { ...state, typedText: action.value };
        } break;
        default: {
            throw new Error();
        } break;
    }
}
