import React, { useEffect } from "react";
import Loader from "$components/Loader";
import { getFunctionalComponentName } from "$src/utils";

export default function withLoading<P>(Component: React.ComponentType<P>) {
    const result = (props: P & {isLoading: boolean}) => {
        const { isLoading, ...componentProps } = props;

        return props.isLoading ?
            <Loader/> :
            <Component {...componentProps as unknown as P}/>;
    }

    const componentName = getFunctionalComponentName(Component);
    if (componentName === undefined) {
        throw new Error("Wrapped component does not have a name");
    }

    result._name = componentName;
    result.displayName = `${componentName}_withLoading`;
    return result;
}
