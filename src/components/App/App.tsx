import React, { useState } from "react";
import TextInput from "$components/TextInput";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchLocationData, { LocationData } from "$services/fetchLocationData";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/fetchWeatherData";
import useOnce from "$hooks/useOnce";
import "./App.scss";

export function App() {
    const [weatherData, setWeatherData] = useState<WeatherData>(null!);
    const [locationData, setLocationData] = useState<LocationData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] =
        useState<CurrentWeatherData|ForecastedWeatherData>(null!);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchLocationData("Teresina").then((locationData: LocationData) => {
            setLocationData(locationData);

            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((data: WeatherData) => {
                setWeatherData(data);
                setSelectedWeatherData(data.current);
                setIsLoading(false);
            });
        });
    });

    const onInputEnter = (value: string) => {
        setIsLoading(true);
        fetchLocationData(value).then((locationData: LocationData) => {
            setLocationData(locationData);

            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((data: WeatherData) => {
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
                locationData={locationData}
                isLoading={isLoading}
            />
        </div>
    );
}

export default withContainer(App, {
    className: "flex justify-content-center align-items-center"
});
