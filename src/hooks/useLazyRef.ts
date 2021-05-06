import { useRef, MutableRefObject } from "react";

type CallbackType<T> = () => T;

export default function useLazyRef<T>(callback: CallbackType<T>): MutableRefObject<T> {
    const ref = useRef<T>(null!);

    if (ref.current === null) {
        ref.current = callback();
    }

    return ref;
}
