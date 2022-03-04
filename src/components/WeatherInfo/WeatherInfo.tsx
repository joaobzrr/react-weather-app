import React from "react";
import SelectedCoordinates from "$components/SelectedCoordinates";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import DailyForecast from "$components/DailyForecast";
import HourlyForecast from "$components/HourlyForecast";
import { Callback, AppData } from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onToggleImperialSystem: Callback<[boolean]>;
    appData:                AppData;
    usingImperialSystem:    boolean;
};

export default function WeatherInfo(props: PropsType) {
    const { onToggleImperialSystem, appData, usingImperialSystem } = props;
    const { weatherDataContainer: _weatherDataContainer, locationData } = appData;

    const weatherData = usingImperialSystem ? _weatherDataContainer.imperial : _weatherDataContainer.metric;
    const { current: currentData, daily: dailyData, hourly: hourlyData } = weatherData;

    return (
        <div className="WeatherInfo">
            <SelectedCoordinates
                locationData={locationData}
                onToggleImperialSystem={onToggleImperialSystem}
                usingImperialSystem={usingImperialSystem}
            />
            <SelectedWeatherInfo
                weatherData={currentData}
                locationData={locationData}
                usingImperialSystem={usingImperialSystem}
            />
            <HourlyForecast
                weatherData={hourlyData}
                timezone={_weatherDataContainer.timezone}
            />
            <DailyForecast weatherData={dailyData} />
        </div>
    );
}
