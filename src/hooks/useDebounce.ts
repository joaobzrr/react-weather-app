import { useRef } from "react";

type CallbackType = (...args: any[]) => void;

export default function useDebounce(callback: CallbackType, delay: number) {
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
