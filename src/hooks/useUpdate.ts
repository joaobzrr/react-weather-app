import React, { useEffect, useRef } from "react";

type Callback = () => any;
type Dependencies = any[];

export default function useUpdate(callback: Callback, dependencies: Dependencies) {
    const hasBeenCalledOnlyOnce = useRef(true);

    useEffect(() => {
        if (hasBeenCalledOnlyOnce.current) {
            hasBeenCalledOnlyOnce.current = false;
        } else {
            callback();
        }
    }, dependencies);
}
