import App from "./App";
import withName from "$hoc/withName";
import withContainer from "$hoc/withContainer";
import { compose, normalize } from "$utils/compose";

const containerProps = {
    className: "flex justify-content-center"
};

export default compose(
    normalize(withName, "App"),
    normalize(withContainer, containerProps)
)(App);
