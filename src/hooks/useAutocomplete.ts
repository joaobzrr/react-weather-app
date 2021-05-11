import { useRef } from "react";
import useLazyRef from "$hooks/useLazyRef";
import useDebounce from "$hooks/useDebounce";
import makeDeferrable from "$services/makeDeferrable";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import { AutocompleteData, Deferrable } from "$types/common";

export default function useAutocomplete() {
    const change = useLazyRef(makeInitialDeferrable);
    const enter  = useLazyRef(makeInitialDeferrable);

    const fetch = useDebounce(async (value, ...deferrables) => {
        const data = await fetchAutocompleteData(value);
        deferrables.forEach(d => d.resolve(data));
    }, 100);

    const handleChange = (value: string): Promise<AutocompleteData> => {
        change.current.reject({isCancelled: true});

        if (value === "") {
            return Promise.reject({invalidInput: true});
        }

        change.current = makeDeferrable<AutocompleteData>();
        fetch.debounced(value, change.current);
        return change.current.promise;
    }

    const handleEnter = (value: string): Promise<AutocompleteData> => {
        enter.current.reject({isCancelled: true});

        enter.current = makeDeferrable<AutocompleteData>();
        fetch.immediate(value, change.current, enter.current);
        return enter.current.promise;
    }

    return [handleChange, handleEnter];
}

function makeInitialDeferrable(): Deferrable<AutocompleteData> {
    const result = makeDeferrable<AutocompleteData>();
    result.promise.catch(() => {});
    return result;
}
