import React, { useState, useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import forecastedToCurrentWeatherData from "$utils/forecastedToCurrentWeatherData";
import convertWeatherData from "$utils/convertWeatherData";
import { AppData, MeasurementSystem } from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectMeasurementSystem: (measurementSystem: MeasurementSystem) => void;
    onSelectWeekDay: (value: number) => void;
    appData: AppData;
    measurementSystem: MeasurementSystem;
    selectedWeekDay: number;
};

export default function WeatherInfo(props: PropsType) {
    const { onSelectMeasurementSystem, onSelectWeekDay, appData, measurementSystem, selectedWeekDay } = props;
    const { weatherData: _weatherData, locationData } = appData;

    const weatherData = convertWeatherData(_weatherData, measurementSystem);

    const selectedWeatherData = (selectedWeekDay > -1) ?
        forecastedToCurrentWeatherData(weatherData.daily[selectedWeekDay]) :
        weatherData.current;

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
                weatherData={weatherData}
            />
        </div>
    );
}
