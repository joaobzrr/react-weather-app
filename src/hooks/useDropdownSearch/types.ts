import { AutocompleteData, LocationData } from "$types/common";

export type HandleFocusFunctionType = () => void;
export type HandleBlurFunctionType = () => void;
export type HandleChangeFunctionType = (value: string) => void;
export type HandleSelectionPrevious = () => void;
export type HandleSelectionNext = () => void;
export type HandleSelect = (value: string) => void;

export type ReturnValueType = [
    AutocompleteData,
    number,
    string,
    boolean,
    HandleFocusFunctionType,
    HandleBlurFunctionType,
    HandleChangeFunctionType,
    HandleSelectionPrevious,
    HandleSelectionNext,
    HandleSelect
];

export type OnStartSelectFunctionType = () => void;
export type OnEndSelectFunctionType = (locationData: LocationData) => void;

// @Rename
export type DropdownSearchData = {
    data:      AutocompleteData;
    index:     number;
    inputText: string;
    typedText: string;
};

export type DropdownSearchAction =
    | { type: "FETCHED_AUTOCOMPLETE_DATA", data:  AutocompleteData }
    | { type: "CHANGED_HIGHLIGHTED_ENTRY", index: number }
    | { type: "INPUT_VALUE_CHANGED",       value: string }
