import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import useOnce from "$hooks/useOnce";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import {
    AppData,
    LocationData,
    WeatherData,
    WeatherDataContainer
} from "$types/common";
import "./App.scss";

import { fetchWeatherData } from "$services/fetchWeatherData";

export default function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [usingImperialSystem, setUsingImperialSystem] = useState(false);
    const [selectedWeekDay, setSelectedWeekDay] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(async () => {
        const locationData = await fetchLocationDataFromIP();
        const { lat, lon } = locationData;
        const weatherDataContainer = await fetchWeatherData(lat, lon);
        setAppData({weatherDataContainer, locationData});
        setIsLoading(false);
    });

    const handleBeginLoadingAutocompleteData = () => {
        setIsLoading(true);
    }

    const handleEndLoadingAutocompleteData = async (locationData: LocationData) => {
        const { lat, lon } = locationData;
        const weatherDataContainer = await fetchWeatherData(lat, lon);
        setAppData({weatherDataContainer, locationData});
        setSelectedWeekDay(-1);
        setIsLoading(false);
    }

    const handleToggleImperialSystem = (usingImperialSystem: boolean) => {
        setUsingImperialSystem(!usingImperialSystem);
    }

    const handleSelectWeekDay = (value: number) => {
        setSelectedWeekDay(value);
    }

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                onBeginLoadingAutocompleteData={handleBeginLoadingAutocompleteData}
                onEndLoadingAutocompleteData={handleEndLoadingAutocompleteData}
            />
            <WeatherInfo
                onToggleImperialSystem={handleToggleImperialSystem}
                onSelectWeekDay={handleSelectWeekDay}
                appData={appData}
                usingImperialSystem={usingImperialSystem}
                selectedWeekDay={selectedWeekDay}
                isLoading={isLoading}
            />
        </div>
    );
}
