import React, { ComponentType } from "react";
import { NamedComponent } from "$types/common";

export default function withName<P>(
    Component: ComponentType<P>,
    name: string
): NamedComponent<P> {
    const result = (props: P) => {
        return <Component {...props} />
    }

    result._name = name;
    result.displayName = `withName(${name})`;
    return result;
}
