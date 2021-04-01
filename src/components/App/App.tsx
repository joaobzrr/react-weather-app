import React, { useState } from "react";
import TextInput from "$components/TextInput";
import WeatherInfo from "$components/WeatherInfo";
import fetchWeatherData from "$services/fetchWeatherData";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData,
    SelectedWeatherData
} from "$services/WeatherData";
import { fetchCoordinates } from "$services/fetchWeatherData";
import useOnce from "$hooks/useOnce";
import "./App.scss";

export default function App() {
    const [weatherData, setWeatherData] = useState<WeatherData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] = useState<SelectedWeatherData>(null!);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchWeatherData("Teresina").then((data) => {
            setWeatherData(data);
            setSelectedWeatherData(data.current);
            setIsLoading(false);
        });
    });

    const onInputEnter = (value: string) => {
        setIsLoading(true);

        fetchWeatherData(value).then((data) => {
            setWeatherData(data);
            setSelectedWeatherData(data.current);
            setIsLoading(false);
        });
    }

    const onPressWeekDayButton = (value: number) => {
        setSelectedWeatherData(weatherData!.daily[value]);
    }

    return (
        <div className="App">
            <TextInput onInputEnter={onInputEnter} />
            <WeatherInfo
                onPressWeekDayButton={onPressWeekDayButton}
                weatherData={weatherData}
                selectedWeatherData={selectedWeatherData}
                isLoading={isLoading}
            />
        </div>
    );
}

App.displayName = "App";
