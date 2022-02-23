import React from "react";
import Loader from "$components/Loader";
import { NamedComponent } from "$types/common";

export default function withLoading<P>(Component: NamedComponent<P>) {
    const result = (props: P & {isLoading: boolean}) => {
        const { isLoading, ...componentProps } = props;

        return props.isLoading ?
            <Loader/> :
            <Component {...componentProps as unknown as P}/>;
    }

    const componentName = Component._name;
    result._name = componentName;
    result.displayName = `withLoading(${componentName})`;
    return result;
}
