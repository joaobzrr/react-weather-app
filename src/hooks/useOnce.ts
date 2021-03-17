import { useRef } from "react";

export default function useOnce(callback: () => void) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback();
        hasBeenCalled.current = true;
    }
}
