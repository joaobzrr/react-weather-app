import { Deferrable, ResolveFunctionType, RejectFunctionType } from "$types/common";

export default function makeDeferrable<T>(): Deferrable<T> {
    let _resolve: ResolveFunctionType<T>;
    let _reject:  RejectFunctionType;

    let _isResolved = false;
    let _isRejected = false;

    const promise = new Promise<T>((resolve, reject) => {
        // @Note: Investigate why we need to cast here.
        _resolve = resolve as unknown as ResolveFunctionType<T>;
        _reject  = reject;
    });

    return {
        promise: promise,
        resolve: _resolve!,
        reject:  _reject!,
        isSettled:   () => _isResolved || _isRejected,
        isFulfilled: () => _isResolved,
        isRejected:  () => _isRejected
    };
}
