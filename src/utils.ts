import { NamedComponent } from "$src/types";

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

export function clamp(n: number, lower: number, upper: number) {
    return Math.max(lower, Math.min(n, upper));
}

export function isNumber(value: any) {
    return typeof value === "number";
}

export function isFunction(obj: any): boolean {
    return obj && Object.prototype.toString.call(obj) === '[object Function]';
}
