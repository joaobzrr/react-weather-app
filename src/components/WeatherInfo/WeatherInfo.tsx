import React from "react";
import WeatherDetails from "$components/WeatherDetails";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import { WeatherData } from "$core/services/fetchWeatherData";
import "./WeatherInfo.scss";

type PropsType = {
    weatherData: WeatherData|null;
}

function WeatherInfo(props: PropsType) {
    const { weatherData } = props;

    const inner = (weatherData !== null) ? (
        <>
        <WeatherDetails weatherData={weatherData} />,
        <SevenDayForecast weatherData={weatherData} />
        </>
    ) : null;

    return (
        <div className="WeatherInfo">
            {inner}
        </div>
    );
}

WeatherInfo.displayName = "WeatherInfo";

export default withContainer(withLoading(WeatherInfo));
