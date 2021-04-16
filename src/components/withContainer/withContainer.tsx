import React from "react";
import { getFunctionalComponentName } from "$src/utils";

type ContainerPropsType = {
    name?: string;
    classes?: string;
}

// @Todo: Make a version of this that does not require a name.
export default function withContainer<P>(
    Component: React.ComponentType<P>,
    containerProps: ContainerPropsType = {}
) {
    const componentName = containerProps.name || getFunctionalComponentName(Component);
    if (componentName === undefined) {
        throw new Error("Wrapped component does not have a name");
    }

    let className = `${componentName}_container`;
    if ('classes' in containerProps) {
        className = `${className} ${containerProps.classes}`;
    }

    const result = (props: P) => (
        <div className={className}>
            <Component {...props} />
        </div>
    );

    result._name = componentName;
    result.displayName = `withContainer(${componentName})`;
    return result;
}
