import sleep from "$services/sleep";
import { isFunction } from "$src/utils";

type PredicateFunction  = () => boolean;
type PayloadFunction<T> = () => T;

export default async function waitFor<T>(
    predicate:   PredicateFunction,
    payload:     T | PayloadFunction<T>,
    pollingTime: number
) {
    while (!predicate()) {
        await sleep(pollingTime);
    }

    let result;
    if (isFunction(payload)) {
        result = (payload as PayloadFunction<T>)();
    } else {
        result = (payload as T);
    }

    return result;
}
