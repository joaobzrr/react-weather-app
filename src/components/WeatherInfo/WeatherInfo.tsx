import React from "react";
import SelectedCoordinates from "$components/SelectedCoordinates";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import DailyForecast from "$components/DailyForecast";
import HourlyForecast from "$components/HourlyForecast";
import { Callback, AppData } from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onToggleImperialSystem: Callback<[boolean]>;
    onSelectWeekDay:        Callback<[number]>;
    appData:                AppData;
    usingImperialSystem:    boolean;
    selectedWeekDay:        number;
};

export default function WeatherInfo(props: PropsType) {
    const { onToggleImperialSystem, onSelectWeekDay, appData, usingImperialSystem, selectedWeekDay } = props;
    const { weatherDataContainer: _weatherDataContainer, locationData } = appData;

    const weatherData = usingImperialSystem ? _weatherDataContainer.imperial : _weatherDataContainer.metric;
    const { current: currentData, daily: dailyData, hourly: hourlyData } = weatherData;

    const selectedWeatherData = (selectedWeekDay > -1) ? dailyData[selectedWeekDay] : currentData;

    return (
        <div className="WeatherInfo">
            <SelectedCoordinates
                locationData={locationData}
                onToggleImperialSystem={onToggleImperialSystem}
                usingImperialSystem={usingImperialSystem}
            />
            <SelectedWeatherInfo
                weatherData={selectedWeatherData}
                locationData={locationData}
                usingImperialSystem={usingImperialSystem}
            />
            <HourlyForecast
                weatherData={hourlyData}
                timezone={_weatherDataContainer.timezone}
            />
            <DailyForecast
                onSelectWeekDay={onSelectWeekDay}
                weatherData={dailyData}
                selectedWeekDay={selectedWeekDay}
            />
        </div>
    );
}
