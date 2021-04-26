import { useState, useRef, useEffect, useMemo } from "react";
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
    (value: string) => void,
    (index: number) => void,
    (value: string) => Promise<LocationData> | null
];

export default function useDropdownSearch(): ReturnValueType {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const [selectedIndex, setSelectedIndex]       = useState(0);

    const deferrableRef           = useRef<Deferrable<LocationData>|null>(null);
    const shouldResolvePromiseRef = useRef(false);

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);
            shouldResolvePromiseRef.current = true;
        });
    }, 500);

    const handleChange = (value: string) => {
        if (value === "") {
            setAutocompleteData([]);
            return;
        }

        setSelectedIndex(0);
        shouldResolvePromiseRef.current = false;

        fetchAndUpdateAutocompleteData(value);
    }

    const handleSelectionChange = (index: number) => {
        setSelectedIndex(index);
    }

    // @Todo: Particular inputs could produce no search results,
    // which would mean autocompleteData would never be set
    // and callbacks depending on the resolution of this promise
    // would never be executed, so we need to handle that case
    // as well.
    const handleSelect = (value: string): Promise<LocationData> | null => {
        if (value === "") {
            return null;
        }

        deferrableRef.current = makeDeferrable();
        const { promise, resolve } = deferrableRef.current;

        if (shouldResolvePromiseRef.current) {
            resolve(autocompleteData[selectedIndex]);
        }

        return promise;
    }

    useEffect(() => {
        if (!shouldResolvePromiseRef.current) {
            return;
        }

        const promise = deferrableRef.current!;
        promise.resolve(autocompleteData[selectedIndex]);
    }, [autocompleteData]);

    const entries = useMemo(() => {
        return autocompleteData.map(entry => entry.city);
    }, [autocompleteData]);

    return [entries, selectedIndex, handleChange, handleSelectionChange, handleSelect];
}
