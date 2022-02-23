import { ComponentType } from "react";

type HOCType = (Component: ComponentType<any>) => ComponentType<any>;

export function compose(...hocs: HOCType[]) {
    if (hocs.length === 0) {
        throw Error("At least one HOC is required");
    }

    return (Component: ComponentType<any>) => {
        return hocs.reduce((a, c) => c(a), Component);
    }
}

type HOCWithManyParameters = (Component: ComponentType<any>, ...args: any[]) => any;

export function normalize(hoc: HOCWithManyParameters, ...args: any[]) {
    return (Component: ComponentType<any>) => {
        return hoc(Component, ...args);
    }
}
