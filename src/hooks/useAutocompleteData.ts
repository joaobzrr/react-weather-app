import React, { useState, useRef } from "react";
import useDelay from "$hooks/useDelay";
import waitFor from "$services/waitFor";
import fetchData from "$services/fetchAutocompleteData";
import { AutocompleteData } from "$src/types";

type ReturnValueType = [
    AutocompleteData,
    (value: string) => void,
    () => Promise<AutocompleteData>
];

export default function useAutocompleteData(): ReturnValueType {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const pendingSelection = useRef<AutocompleteData|null>(null);

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        fetchData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);
            pendingSelection.current = data;
        });
    }, 500);

    const fetchAutocompleteData = (value: string) => {
        pendingSelection.current = null;
        fetchAndUpdateAutocompleteData(value);
    }

    const waitAutocompleteData = () => {
        // @Todo: Particular inputs could produce no search results,
        // which would mean autocompleteData would never be set
        // and callbacks depending on the resolution of this promise
        // would never be executed, so we need to handle that case
        // as well.
        return waitFor(() => pendingSelection.current, 100);
    }

    return [autocompleteData, fetchAutocompleteData, waitAutocompleteData];
}
