import { AutocompleteData, LocationData } from "$types/common";

export type HandleFocusFunctionType = () => void;
export type HandleBlurFunctionType = () => void;
export type HandleChangeFunctionType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleSelectionPrevious = (e: React.KeyboardEvent<HTMLInputElement>) => void;
export type HandleSelectionNext = (e: React.KeyboardEvent<HTMLInputElement>) => void;
export type HandleSelect = (e: React.KeyboardEvent<HTMLInputElement>) => void;

export type ReturnValueType = [
    AutocompleteData,
    number,
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

export type DataAndIndex = {
    data:  AutocompleteData;
    index: number;
};

export type DataAndIndexAction =
    | { type: "reinit" }
    | { type: "set-data", data: AutocompleteData }
    | { type: "set-index", index: number };
