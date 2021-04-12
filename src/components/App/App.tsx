import React, { useState } from "react";
import TextInput from "$components/TextInput";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchCoordinates from "$services/fetchCoordinates";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData,
    SelectedWeatherData
} from "$services/WeatherData";
import useOnce from "$hooks/useOnce";
import "./App.scss";

export function App() {
    const [weatherData, setWeatherData] = useState<WeatherData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] = useState<SelectedWeatherData>(null!);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchCoordinates("Teresina").then(({city, lat, lon}) => {
            fetchWeatherData(city, lat, lon).then(data => {
                setWeatherData(data);
                setSelectedWeatherData(data.current);
                setIsLoading(false);
            });
        });
    });

    const onInputEnter = (value: string) => {
        setIsLoading(true);
        fetchCoordinates(value).then(({city, lat, lon}) => {
            fetchWeatherData(city, lat, lon).then(data => {
                setWeatherData(data);
                setSelectedWeatherData(data.current);
                setIsLoading(false);
            });
        });
    }

    const onPressWeekDayButton = (value: number) => {
        setSelectedWeatherData(weatherData!.daily[value]);
    }

    return (
        <div className="App flex flex-column">
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

export default withContainer(App, {
    className: "flex justify-content-center align-items-center"
});
