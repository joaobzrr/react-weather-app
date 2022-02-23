import { useRef } from "react";
import { Callback } from "$types/common";

export default function useDebounce(callback: Callback<any[]>, delay: number) {
    const timeoutRef = useRef<number|undefined>();

    const debounced = (...args: any[]) => {
        clearInterval(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    }

    const immediate = (...args: any[]) => {
        clearInterval(timeoutRef.current);
        callback(...args);
    }

    return { debounced, immediate };
}
