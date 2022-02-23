import { useRef } from "react";

export default function useOnce(callback: () => any) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback();
        hasBeenCalled.current = true;
    }
}
