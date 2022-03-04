import { useRef } from "react";

export function useOnce(callback: () => any) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback();
        hasBeenCalled.current = true;
    }
}
