import React from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import convertWeatherData from "$utils/convertWeatherData";
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
    const { weatherData: _weatherData, locationData } = appData;

    const weatherData = convertWeatherData(_weatherData, measurementSystem);
    const { current: currentData, daily: dailyData, hourly: hourlyData } = weatherData;

    const selectedWeatherData = (selectedWeekDay > -1) ?
        dailyData[selectedWeekDay] : currentData;

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                onSelectMeasurementSystem={onSelectMeasurementSystem}
                weatherData={selectedWeatherData}
                locationData={locationData}
                measurementSystem={measurementSystem}
            />
            <SevenDayForecast
                onSelectWeekDay={onSelectWeekDay}
                weatherData={dailyData}
                selectedWeekDay={selectedWeekDay}
            />
        </div>
    );
}
