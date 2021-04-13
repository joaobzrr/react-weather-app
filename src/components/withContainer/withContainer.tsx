import React from "react";
import { getFunctionalComponentName } from "$src/utils";

// @Todo: Make a version of this that does not require a name.
export default function withContainer<P>(
    Component: React.ComponentType<P>,
    containerProps?: React.HTMLProps<HTMLDivElement>,
    name?: string
) {
    containerProps = containerProps || {};

    const componentName = name || getFunctionalComponentName(Component);
    if (componentName === undefined) {
        throw new Error("Wrapped component does not have a name");
    }

    let containerName = `${componentName}_container`;
    let className = containerName;
    if ('className' in containerProps) {
        className = `${className} ${containerProps.className}`;
        delete containerProps.className;
    }

    const result = (props: P) => (
        <div className={className} {...containerProps}>
            <Component {...props} />
        </div>
    );

    result._name = componentName;
    result.displayName = containerName;
    return result;
}
