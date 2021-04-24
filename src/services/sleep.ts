export default function sleep(milliseconds: number) {
    // @Remember Check what this r param is supposed to be.
    return new Promise(r => setTimeout(r, milliseconds));
}
