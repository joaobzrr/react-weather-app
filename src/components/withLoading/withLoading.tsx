import React, { useEffect } from "react";
import Loader from "$components/Loader";

type ExtraProps = {
    isLoading: boolean;
}

export default function withLoading<P>(Component: React.ComponentType<P>) {
    const Wrapped = (props: P & ExtraProps) => {
        const { isLoading, ...componentProps } = props;

        return props.isLoading ?
            <Loader/> :
            <Component {...componentProps as unknown as P}/>;
    }

    Wrapped.displayName = Component.displayName;

    return Wrapped;
}
