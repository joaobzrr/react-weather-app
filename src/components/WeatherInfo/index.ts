import WeatherInfo from "./WeatherInfo";
import withName from "$hoc/withName";
import withContainer from "$hoc/withContainer";
import withLoading from "$hoc/withLoading";
import { compose, normalize } from "$utils/compose";

const containerProps = {
    className: "flex justify-content-center align-items-center"
}

export default compose(
    normalize(withName, "WeatherInfo"),
    withLoading,
    normalize(withContainer, containerProps)
)(WeatherInfo);
