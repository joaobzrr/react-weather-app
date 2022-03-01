export function popFromObject(obj: Record<string, any>, key: string, defaultValue?: any) {
    if (!obj.hasOwnProperty(key)) {
        return defaultValue;
    }

    const result = obj[key];
    delete obj[key];
    return result;
}

export function clamp(n: number, lower: number, upper: number): number {
    return Math.max(lower, Math.min(n, upper));
}
