import React from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import DailyForecast from "$components/DailyForecast";
import {
    Callback,
    AppData,
    MeasurementSystem
} from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectMeasurementSystem: Callback<[MeasurementSystem]>;
    onSelectWeekDay:           Callback<[number]>;
    appData:                   AppData;
    measurementSystem:         MeasurementSystem;
    selectedWeekDay:           number;
};

export default function WeatherInfo(props: PropsType) {
    const { onSelectMeasurementSystem, onSelectWeekDay, appData, measurementSystem, selectedWeekDay } = props;
    const { weatherDataContainer: _weatherDataContainer, locationData } = appData;

    const weatherData = (measurementSystem === "metric") ? _weatherDataContainer.metric : _weatherDataContainer.imperial;
    const { current: currentData, daily: dailyData, hourly: hourlyData } = weatherData;

    const selectedWeatherData = (selectedWeekDay > -1) ? dailyData[selectedWeekDay] : currentData;

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                onSelectMeasurementSystem={onSelectMeasurementSystem}
                weatherData={selectedWeatherData}
                locationData={locationData}
                measurementSystem={measurementSystem}
            />
            <DailyForecast
                onSelectWeekDay={onSelectWeekDay}
                weatherData={dailyData}
                selectedWeekDay={selectedWeekDay}
            />
        </div>
    );
}
