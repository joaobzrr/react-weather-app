import { NamedComponent } from "$types/common";

export function getFunctionalComponentName<P>(Component: NamedComponent<P>): string | undefined {
    if (Component._name !== undefined) {
        return Component._name;
    } else if (Component.displayName !== undefined) {
        return Component.displayName;
    } else {
        return Component.name;
    }
}

export function clamp(n: number, lower: number, upper: number): number {
    return Math.max(lower, Math.min(n, upper));
}
