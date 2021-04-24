import React, { useState, useRef } from "react";
import useDelay from "$hooks/useDelay";
import waitFor from "$services/waitFor";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import {
    AutocompleteData,
    LocationData
} from "$src/types";

type ReturnValueType = [
    AutocompleteData,
    LocationData,
    (value: string) => void,
    (index: number) => void,
    (value: string) => void
];

export default function useDropdownSearch(): ReturnValueType {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const [locationData, setLocationData]         = useState<LocationData>(null!);

    const fetchedData   = useRef<AutocompleteData|null>(null);
    const selectedIndex = useRef(0);

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        // @Todo: In case we had previously tried to fetch autocomplete data
        // but still did not get a response, we should cancel this previous
        // request before making another one.
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);
            fetchedData.current = data;
        });
    }, 500);

    const handleChange = (value: string) => {
        if (value === "") {
            setAutocompleteData([]);
            return;
        }

        fetchedData.current   = null;
        selectedIndex.current = 0;

        fetchAndUpdateAutocompleteData(value);
    }

    const handleSelectionChange = (index: number) => {
        selectedIndex.current = index;
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

        // @Todo: Move these function types somewhere else.
        const predicate: (() => boolean) = () => {
            return fetchedData.current !== null;
        }

        // @Todo: Move these function types somewhere else.
        const payload: (() => AutocompleteData) = () => {
            return fetchedData.current!;
        }

        waitFor(predicate, payload, 100).then((data: AutocompleteData) => {
            setLocationData(data[selectedIndex.current]);
        });
    }

    return [autocompleteData, locationData, handleChange, handleSelectionChange, handleSelect];
}
