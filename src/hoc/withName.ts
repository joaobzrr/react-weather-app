import { ComponentType } from "react";
import { NamedComponent } from "$types/common";

export default function withName<P>(
    Component: ComponentType<P>,
    name: string
): NamedComponent<P> {
    (Component as NamedComponent<P>)._name = name;
    return Component;
}
