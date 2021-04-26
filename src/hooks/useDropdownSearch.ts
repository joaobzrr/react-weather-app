import React, { useState, useRef, useEffect, useMemo } from "react";
import useDelay from "$hooks/useDelay";
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
    string[],
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

    const deferrableRef                = useRef<Deferrable<LocationData>|null>(null);
    const canResolvePromiseRef         = useRef(false);
    const shouldResolvePromiseLaterRef = useRef(false);

    const { data: autocompleteData, index: selectedIndex } = wrapper;
    const entries = autocompleteData.map(entry => entry.city);

    const handleFocus = () => setDropdownIsHidden(false);
    const handleBlur  = () => setDropdownIsHidden(true);

    const handleChangeWithDelay = useDelay((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        if (value === "") {
            setWrapper(makeWrapper());
            return;
        }

        // @Todo: Particular inputs could produce no search results,
        // which would mean autocompleteData would never be set
        // and callbacks depending on the resolution of this promise
        // would never be executed, so we need to handle that case
        // as well.
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            canResolvePromiseRef.current = true;
            setWrapper(makeWrapper(data));
        });
    }, 500);

    // @Todo: Think about the order of setDropdownIsHidden here, when
    // it should be set to true or false and it's relation to
    // entrie.length.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        canResolvePromiseRef.current = false;
        handleChangeWithDelay(e)
    };

    const handleSelection = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const normalizedIndex = clamp(index, 0, entries.length - 1);
        const input = e.target as HTMLInputElement;
        input.value = entries[normalizedIndex];
        setWrapper(({data}) => makeWrapper(data, normalizedIndex));
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
            resolve(autocompleteData[selectedIndex]);
        } else {
            shouldResolvePromiseLaterRef.current = true;
        }
    }

    useEffect(() => {
        if (!shouldResolvePromiseLaterRef.current) {
            setDropdownIsHidden(false);
            return;
        }

        if (!canResolvePromiseRef.current) {
            return;
        }

        shouldResolvePromiseLaterRef.current = false;

        const { resolve } = deferrableRef.current!;
        resolve(autocompleteData[selectedIndex]);
    }, [autocompleteData]);

    const dropdownIsVisible = !dropdownIsHidden && entries.length > 0;

    return [entries, selectedIndex, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionPrevious, handleSelectionNext, handleSelect];
}
