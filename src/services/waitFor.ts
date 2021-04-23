export default async function waitFor<T>(callback: () => any, pollingTime: number) {
    while (!callback()) {
        await sleep(pollingTime);
    }

    return callback();
}

function sleep(milliseconds: number) {
    // @Remember Check what this r param is supposed to be.
    return new Promise(r => setTimeout(r, milliseconds));
}
