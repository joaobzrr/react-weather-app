import React, { useState, useRef, useMemo } from "react";
import useDelay from "$hooks/useDelay";
import waitFor from "$services/waitFor";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import {
    AutocompleteData,
    LocationData
} from "$src/types";

type Entry = string;

type ReturnValueType = [
    Entry[],
    number,
    (value: string) => void,
    (index: number) => void,
    (value: string) => Promise<LocationData>
];

export default function useDropdownSearch(): ReturnValueType {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const [selectedIndex, setSelectedIndex]       = useState(0);

    const autocompleteDataRef = useRef<AutocompleteData|null>([]); // @Remove
    const selectedIndexRef    = useRef(0);                         // @Remove
    const isFetchingRef       = useRef(false);                     // @Remove

    const entries = useMemo(() => {
        return autocompleteData.map(entry => entry.city);
    }, [autocompleteData]);

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);

            autocompleteDataRef.current = data;  // @Remove
            isFetchingRef.current       = false; // @Remove
        });
    }, 500);

    const handleChange = (value: string) => {
        if (value === "") {
            setAutocompleteData([]);
            return;
        }

        setSelectedIndex(0);

        autocompleteDataRef.current = null; // @Remove
        isFetchingRef.current       = true; // @Remove

        fetchAndUpdateAutocompleteData(value);
    }

    const handleSelectionChange = (index: number) => {
        setSelectedIndex(index);

        selectedIndexRef.current = index; // @Remove
    }

    // @Todo: Particular inputs could produce no search results,
    // which would mean autocompleteData would never be set
    // and callbacks depending on the resolution of this promise
    // would never be executed, so we need to handle that case
    // as well.
    const handleSelect = (value: string) => {
        // @Todo: Maybe, instead of checking that the input value is not empty
        // we could check that autocompleteData is not null instead. If that
        // works, we don't need this value parameter here.
        if (value === "") {
            return;
        }

        setSelectedIndex(0);

        // @Remove @Todo: There should be a better way to this without using waitFor
        // and refs. We should try using observables and see if they are
        // better suited than promises for this kind of thing.
        const predicate: (() => boolean) = () => {
            return !isFetchingRef.current;
        }

        const payload: (() => [AutocompleteData, number]) = () => {
            return [autocompleteDataRef.current!, selectedIndexRef.current];
        }

        // @Todo: In case we had previously tried to fetch autocomplete data
        // but still did not get a response, we should cancel this previous
        // request before making another one.
        return waitFor(predicate, payload, 100).then(([data, index]) => {
            debugger;

            setAutocompleteData(data);
            selectedIndexRef.current = 0; // @Remove

            return data[index];
        }) as any; // @Any
    }

    return [entries, selectedIndex, handleChange, handleSelectionChange, handleSelect];
}
