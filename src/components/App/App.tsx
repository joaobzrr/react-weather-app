import React, { useState } from "react";
import TextInput from "$components/TextInput";
import WeatherInfo from "$components/WeatherInfo";
import fetchWeatherData, { WeatherData } from "$services/fetchWeatherData";
import { fetchCoordinates } from "$services/fetchWeatherData";
import useOnce from "$hooks/useOnce";
import "./App.scss";

export default function App() {
    const [weatherData, setWeatherData] = useState<WeatherData|null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        // @Todo: Can we simplify this any further?
        fetchWeatherData("Teresina").then((data) => {
            setWeatherData(data);
            setIsLoading(false);
        });
    });

    const handleInputEnter = (value: string) => {
        setIsLoading(true);

        // @Todo: Can we simplify this any further?
        fetchWeatherData(value).then((data) => {
            setWeatherData(data);
            setIsLoading(false);
        });
    }

    return (
        <div className="App">
            <TextInput handleInputEnter={handleInputEnter} />
            <WeatherInfo
                weatherData={weatherData}
                isLoading={isLoading}
            />
        </div>
    );
}

App.displayName = "App";
