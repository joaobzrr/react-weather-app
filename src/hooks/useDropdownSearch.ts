import React, { useState, useRef, useEffect, useMemo } from "react";
import useDelay from "$hooks/useDelay";
import makeDeferrable from "$services/makeDeferrable";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import {
    AutocompleteData,
    LocationData,
    Deferrable
} from "$src/types";

type ReturnValueType = [
    string[],
    number,
    boolean,
    () => void,
    () => void,
    (value: string) => void,
    (index: number) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
];

export default function useDropdownSearch(
    onStartSelect: () => void,
    onEndSelect: (locationData: LocationData) => void
): ReturnValueType {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);

    const deferrableRef = useRef<Deferrable<LocationData>|null>(null);
    const canResolvePromiseRef = useRef(false);
    const shouldResolvePromiseLaterRef = useRef(false);

    const entries = useMemo(() => {
        return autocompleteData.map(entry => entry.city);
    }, [autocompleteData]);

    const handleFocus = () => {
        setDropdownIsHidden(false);
    }

    const handleBlur = () => {
        setDropdownIsHidden(true);
    }

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);
            canResolvePromiseRef.current = true;
        });
    }, 500);

    const handleChange = (value: string) => {
        if (value === "") {
            setAutocompleteData([]);
            setDropdownIsHidden(true);
            return;
        }

        setSelectedIndex(0);
        setDropdownIsHidden(false);

        shouldResolvePromiseLaterRef.current = false;
        canResolvePromiseRef.current = false;

        fetchAndUpdateAutocompleteData(value);
    }

    const handleSelectionChange = (index: number) => {
        setSelectedIndex(index);
    }

    const handleSelectionPrevious = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const index = Math.max(selectedIndex - 1, 0);
        input.value = entries[index];
        setSelectedIndex(index);
    }

    const handleSelectionNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const index = Math.min(selectedIndex + 1, entries.length - 1)
        input.value = entries[index];
        setSelectedIndex(index);
    }

    // @Todo: Particular inputs could produce no search results,
    // which would mean autocompleteData would never be set
    // and callbacks depending on the resolution of this promise
    // would never be executed, so we need to handle that case
    // as well.
    const handleSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        if (value === "") {
            return;
        }

        input.value = entries[selectedIndex];

        onStartSelect();

        deferrableRef.current = makeDeferrable();
        const { promise, resolve } = deferrableRef.current;

        promise.then(onEndSelect);

        if (canResolvePromiseRef.current) {
            resolve(autocompleteData[selectedIndex]);
        } else {
            shouldResolvePromiseLaterRef.current = true;
        }
    }

    useEffect(() => {
        if (!(canResolvePromiseRef.current && shouldResolvePromiseLaterRef.current)) {
            return;
        }

        const promise = deferrableRef.current!;
        promise.resolve(autocompleteData[selectedIndex]);
    }, [autocompleteData]);

    const dropdownIsVisible = !dropdownIsHidden && entries.length > 0;

    return [entries, selectedIndex, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionChange, handleSelectionPrevious, handleSelectionNext, handleSelect];
}
