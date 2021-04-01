import React from "react";
import WeatherDetails from "$components/WeatherDetails";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData,
    SelectedWeatherData
} from "$services/WeatherData";
import "./WeatherInfo.scss";

type PropsType = {
    onPressWeekDayButton: (value: number) => void;
    weatherData: WeatherData;
    selectedWeatherData: SelectedWeatherData;
}

function WeatherInfo(props: PropsType) {
    const { weatherData, selectedWeatherData, onPressWeekDayButton } = props;

    return (
        <div className="WeatherInfo">
            <WeatherDetails
                weatherData={weatherData}
                selectedWeatherData={selectedWeatherData!}
            />
            <SevenDayForecast
                weatherData={weatherData}
                onPressWeekDayButton={onPressWeekDayButton}
            />
        </div>
    );
}

WeatherInfo.displayName = "WeatherInfo";

export default withContainer(withLoading(WeatherInfo));
