import { useRef } from "react";
import useDebounce from "$hooks/useDebounce";
import makeDeferrable from "$services/makeDeferrable";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import { AutocompleteData, Deferrable } from "$types/common";

export default function useAutosuggest() {
    const change = useRef(createRejectedDeferrable());
    const enter  = useRef(createRejectedDeferrable());

    const fetch = useDebounce(async (value, ...deferrables) => {
        const data = await fetchAutocompleteData(value);
        const pending = deferrables.filter(d => !d.isSettled());
        pending.forEach(d => d.resolve(data));
    }, 500);

    const handleChange = (value: string): Promise<AutocompleteData> => {
        if (!change.current.isSettled()) {
            change.current.reject({isCancelled: true});
        }

        if (value === "") {
            return Promise.reject({invalidInput: true});
        }

        change.current = makeDeferrable<AutocompleteData>();
        fetch.debounced(value, change.current);
        return change.current.promise;
    }

    const handleEnter = (value: string): Promise<AutocompleteData> => {
        // @Note: We are doing this check already in the caller,
        // so maybe throw this away?
        if (value === "") {
            return Promise.reject({invalidInput: true});
        }

        if (!enter.current.isSettled()) {
            enter.current.reject({isCancelled: true});
        }

        enter.current = makeDeferrable<AutocompleteData>();

        const deferrables = [enter.current];
        if (!change.current.isSettled()) {
            deferrables.unshift(change.current);
        }
        fetch.immediate(value, ...deferrables);

        return enter.current.promise;
    }

    return [handleChange, handleEnter];
}

function createRejectedDeferrable(): Deferrable<AutocompleteData> {
    const result = makeDeferrable<AutocompleteData>();
    result.promise.catch(() => {})
    return result;
}
