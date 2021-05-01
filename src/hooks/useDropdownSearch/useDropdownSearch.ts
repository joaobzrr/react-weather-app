import React, { useState, useReducer, useRef, useEffect, useMemo } from "react";
import useDataAndIndex from "./useDropdownSearchData";
import makeDeferrable from "$services/makeDeferrable";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import { clamp } from "$src/utils";
import { AutocompleteData, LocationData, Deferrable } from "$types/common";
import { ReturnValueType, OnStartSelectFunctionType, OnEndSelectFunctionType } from "./types";

export default function useDropdownSearch(onStartSelect: OnStartSelectFunctionType, onEndSelect: OnEndSelectFunctionType): ReturnValueType {
    const [autocompleteData, selectedIndex, inputText, dispatch] = useDataAndIndex();
    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);

    const cancelFunctionRef            = useRef<(() => void)|null>(null);
    const deferrableRef                = useRef<Deferrable<LocationData>|null>(null);
    const canResolvePromiseRef         = useRef(false);
    const shouldResolvePromiseLaterRef = useRef(false);

    const handleFocus = () => setDropdownIsHidden(false);
    const handleBlur  = () => setDropdownIsHidden(true);

    const handleChange = (value: string) => {
        dispatch({type: "INPUT_VALUE_CHANGED", value: value});

        if (cancelFunctionRef.current !== null) {
            cancelFunctionRef.current();
        }

        if (value === "") {
            return;
        }

        canResolvePromiseRef.current = false;

        const [promise, cancel] = fetchAutocompleteData(value);
        cancelFunctionRef.current = cancel;

        promise.then((data: AutocompleteData) => {
            cancelFunctionRef.current = null;
            canResolvePromiseRef.current = true;
            dispatch({type: "FETCHED_AUTOCOMPLETE_DATA", data: data});
        }).catch(error => {
            // @Todo: Handle 404.
        });
    }

    const handleSelectionPrevious = () => {
        const index = clamp(selectedIndex - 1, -1, autocompleteData.length - 1);
        dispatch({type: "CHANGED_HIGHLIGHTED_ENTRY", index: index});
    }

    const handleSelectionNext = () => {
        const index = clamp(selectedIndex + 1, -1, autocompleteData.length - 1);
        dispatch({type: "CHANGED_HIGHLIGHTED_ENTRY", index: index});
    }

    const handleSelect = (value: string) => {
        if (value === "") {
            return;
        }

        setDropdownIsHidden(true);

        deferrableRef.current = makeDeferrable();
        const { promise, resolve } = deferrableRef.current;

        onStartSelect();
        promise.then(onEndSelect);

        if (canResolvePromiseRef.current) {
            resolve(autocompleteData[Math.max(0, selectedIndex - 1)]);
        } else {
            shouldResolvePromiseLaterRef.current = true;
        }
    }

    useEffect(() => {
        if (!shouldResolvePromiseLaterRef.current) {
            setDropdownIsHidden(false);
            return;
        }

        shouldResolvePromiseLaterRef.current = false;

        if (!canResolvePromiseRef.current) {
            return;
        }

        const { resolve } = deferrableRef.current!;
        resolve(autocompleteData[Math.max(0, selectedIndex - 1)]);
    }, [autocompleteData]);

    const dropdownIsVisible = !dropdownIsHidden && autocompleteData.length > 0;

    return [autocompleteData, selectedIndex, inputText, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionPrevious, handleSelectionNext, handleSelect];
}
