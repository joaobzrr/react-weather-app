import React from "react";
import { NamedComponent } from "$types/global";

export function getFunctionalComponentName<P>(Component: NamedComponent<P>): string | undefined {
    if (Component._name !== undefined) {
        return Component._name;
    } else if (Component.displayName !== undefined) {
        return Component.displayName;
    } else {
        return Component.name;
    }
}

export function formatTemperature(value: number) {
    return value.toString() + " º";
}

export function isNumber(value: any) {
    return typeof value === "number";
}
