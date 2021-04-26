import {
    Deferrable,
    ResolveFunctionType,
    RejectFunctionType
} from "$src/types";

export default function makeDeferrable<T>(): Deferrable<T> {
    const deferreds: any = {resolve: null, reject: null};

    const promise = new Promise<T>((resolve, reject) => {
        deferreds.resolve = resolve;
        deferreds.reject  = reject;
    });

    return {
        promise: promise,
        resolve: deferreds.resolve,
        reject:  deferreds.reject
    };
}
