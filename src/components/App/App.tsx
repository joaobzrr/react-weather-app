import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchLocationData, { LocationData } from "$services/fetchLocationData";
import { AppData } from "$types/global";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/fetchWeatherData";
import useOnce from "$hooks/useOnce";
import "./App.scss";

export function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] =
        useState<CurrentWeatherData|ForecastedWeatherData>(null!);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchLocationData("Teresina").then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((data: WeatherData) => {
                setSelectedWeatherData(data.current);
                setAppData({weather: data, location: locationData});
                setIsLoading(false);
            });
        });
    });

    const onInputEnter = (value: string) => {
        setIsLoading(true);
        fetchLocationData(value).then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((data: WeatherData) => {
                setSelectedWeatherData(data.current);
                setAppData({weather: data, location: locationData});
                setIsLoading(false);
            });
        });
    }

    const onPressWeekDayButton = (value: number) => {
        setSelectedWeatherData(appData!.weather.daily[value]);
    }

    return (
        <div className="App flex flex-column">
            <DropdownSearch onInputEnter={onInputEnter} />
            <AppDataProvider data={appData}>
                <WeatherInfo
                    onPressWeekDayButton={onPressWeekDayButton}
                    selectedWeatherData={selectedWeatherData}
                    isLoading={isLoading}
                />
            </AppDataProvider>
        </div>
    );
}

export default withContainer(App, {
    className: "flex justify-content-center align-items-center"
});
