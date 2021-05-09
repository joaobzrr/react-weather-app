import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import useOnce from "$hooks/useOnce";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import { AppData, LocationData, WeatherData } from "$types/common";
import "./App.scss";

export function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [selectedWeatherData, setSelectedWeatherData] = useState(-1);
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

    const handleBeginLoadingAutocompleteData = () => {
        setIsLoading(true);
    }

    const handleEndLoadingAutocompleteData = (locationData: LocationData) => {
        const { lat, lon } = locationData;
        fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
            setAppData({weather: weatherData, location: locationData});
            setSelectedWeatherData(-1);
            setIsLoading(false);
        });
    }

    const handleSelectWeatherData = (value: number) => {
        setSelectedWeatherData(value);
    }

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                onBeginLoadingAutocompleteData={handleBeginLoadingAutocompleteData}
                onEndLoadingAutocompleteData={handleEndLoadingAutocompleteData}
            />
            <WeatherInfo
                onSelectWeatherData={handleSelectWeatherData}
                selectedWeatherData={selectedWeatherData}
                appData={appData}
                isLoading={isLoading}
            />
        </div>
    );
}

export default withContainer(App, {
    classes: "flex justify-content-center align-items-center"
});
