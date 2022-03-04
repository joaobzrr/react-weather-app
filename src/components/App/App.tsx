import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import { useOnce } from "$hooks/useOnce";
import { fetchLocationDataFromIP } from "$services/fetchLocationDataFromIP";
import { fetchWeatherData } from "$services/fetchWeatherData";
import {
    AppData,
    LocationData,
    WeatherData,
    WeatherDataContainer
} from "$types/common";
import "./App.scss";

export default function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [usingImperialSystem, setUsingImperialSystem] = useState(false);
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
        setIsLoading(false);
    }

    const handleToggleImperialSystem = (usingImperialSystem: boolean) => {
        setUsingImperialSystem(!usingImperialSystem);
    }

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                onBeginLoadingAutocompleteData={handleBeginLoadingAutocompleteData}
                onEndLoadingAutocompleteData={handleEndLoadingAutocompleteData}
            />
            <WeatherInfo
                onToggleImperialSystem={handleToggleImperialSystem}
                appData={appData}
                usingImperialSystem={usingImperialSystem}
                isLoading={isLoading}
            />
        </div>
    );
}
