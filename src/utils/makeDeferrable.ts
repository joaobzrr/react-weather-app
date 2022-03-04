import { Deferrable, ResolveFunctionType, RejectFunctionType } from "$types/common";

export function makeDeferrable<T>(): Deferrable<T> {
    let _resolve: ResolveFunctionType<T>;
    let _reject:  RejectFunctionType;

    const promise = new Promise<T>((resolve, reject) => {
        _resolve = resolve as unknown as ResolveFunctionType<T>;
        _reject  = reject;
    });

    return {
        promise: promise,
        resolve: _resolve!,
        reject:  _reject!
    };
}
