import React from "react";
import { makeClassName } from "$utils/common";
import { NamedComponent } from "$types/common";

export default function withContainer<P>(
    Component: NamedComponent<P>,
    containerProps: React.HTMLAttributes<HTMLDivElement>
) {
    const componentName = Component._name;
    const containerClassName = componentName + "_container";
    const className = makeClassName(containerProps, containerClassName);

    const result = (props: P) => (
        <div className={className} {...containerProps}>
            <Component {...props} />
        </div>
    );

    result._name = componentName;
    result.displayName = `withContainer(${componentName})`;
    return result;
}
