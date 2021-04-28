import React, { useState, useRef, useEffect, useMemo } from "react";
import makeDeferrable from "$services/makeDeferrable";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import { clamp } from "$src/utils";
import {
    AutocompleteData,
    LocationData,
    Deferrable
} from "$src/types";

type OnStartSelectFunctionType = () => void;
type OnEndSelectFunctionType = (locationData: LocationData) => void;

type ReturnValueType = [
    AutocompleteData,
    number,
    boolean,
    () => void,
    () => void,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
];

type Wrapper = {
    data:  AutocompleteData;
    index: number;
}

function makeWrapper(data: AutocompleteData = [], index: number = 0) {
    return { data, index };
}

export default function useDropdownSearch(onStartSelect: OnStartSelectFunctionType, onEndSelect: OnEndSelectFunctionType): ReturnValueType {
    const [wrapper, setWrapper]                   = useState<Wrapper>(makeWrapper());
    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);

    const inputValueRef                = useRef("");
    const cancelFunctionRef            = useRef<(() => void)|null>(null);
    const deferrableRef                = useRef<Deferrable<LocationData>|null>(null);
    const canResolvePromiseRef         = useRef(false);
    const shouldResolvePromiseLaterRef = useRef(false);

    const { data: autocompleteData, index: selectedIndex } = wrapper;

    const handleFocus = () => setDropdownIsHidden(false);
    const handleBlur  = () => setDropdownIsHidden(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        inputValueRef.current = value;

        canResolvePromiseRef.current = false;

        if (value === "") {
            setWrapper(makeWrapper());
            return;
        }

        if (cancelFunctionRef.current !== null) {
            cancelFunctionRef.current();
        }

        const [promise, cancel] = fetchAutocompleteData(value);
        cancelFunctionRef.current = cancel;

        promise.then((data: AutocompleteData) => {
            cancelFunctionRef.current = null;
            canResolvePromiseRef.current = true;
            setWrapper(makeWrapper(data));
        }).catch(error => {
            // @Todo: Handle 404.
        });
    }

    const handleSelection = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const normalizedIndex = clamp(index, 0, autocompleteData.length);
        setWrapper(({data}) => makeWrapper(data, normalizedIndex));

        const input = e.target as HTMLInputElement;
        if (normalizedIndex === 0) {
            input.value = inputValueRef.current;
        } else {
            const { city } = autocompleteData[normalizedIndex - 1];
            input.value = city;
        }
    }

    const handleSelectionPrevious = (e: React.KeyboardEvent<HTMLInputElement>) => handleSelection(e, selectedIndex - 1);
    const handleSelectionNext     = (e: React.KeyboardEvent<HTMLInputElement>) => handleSelection(e, selectedIndex + 1);

    const handleSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.value === "") {
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

    return [autocompleteData, selectedIndex, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionPrevious, handleSelectionNext, handleSelect];
}
