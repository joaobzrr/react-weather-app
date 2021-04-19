import { useRef } from "react";
import { TimeoutType } from "$src/types";

type CallbackType = (...args: any[]) => void;

export default function useDelay(callback: CallbackType, delay: number) {
    const timeoutRef = useRef<TimeoutType | null>(null);

    return (...args: any[]) => {
        if (timeoutRef.current !== null) {
            clearInterval(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
            timeoutRef.current = null;
        }, delay);
    }
}
