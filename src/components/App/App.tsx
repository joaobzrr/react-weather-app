import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import useOnce from "$hooks/useOnce";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import {
    AppData,
    LocationData,
    WeatherData,
    SelectedWeatherData,
} from "$src/types";
import "./App.scss";

export function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] = useState<SelectedWeatherData>("current");
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchLocationDataFromIP().then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
                setAppData({weather: weatherData, location: locationData});
                setIsLoading(false);
            });
        });
    });

    const handleDropdownSearchStartSelect = () => {
        setIsLoading(true);
    }

    const handleDropdownSearchEndSelect = (locationData: LocationData) => {
        const { lat, lon } = locationData;
        fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
            setAppData({weather: weatherData, location: locationData});
            setSelectedWeatherData("current");
            setIsLoading(false);
        });
    }

    const handleSelectWeekDay = (value: number) => {
        setSelectedWeatherData(value);
    }

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                onStartSelect={handleDropdownSearchStartSelect}
                onEndSelect={handleDropdownSearchEndSelect}
            />
            <AppDataProvider data={appData}>
                <WeatherInfo
                    handleSelectWeekDay={handleSelectWeekDay}
                    selectedWeatherData={selectedWeatherData}
                    isLoading={isLoading}
                />
            </AppDataProvider>
        </div>
    );
}

export default withContainer(App, {
    classes: "flex justify-content-center align-items-center"
});
