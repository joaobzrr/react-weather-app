import React, { useState, useMemo } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import useOnce from "$hooks/useOnce";
import useUpdate from "$hooks/useUpdate";
import useDropdownSearch from "$hooks/useDropdownSearch";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import {
    AppData,
    LocationData,
    WeatherData,
    SelectedWeatherData,
    AutocompleteData
} from "$src/types";
import "./App.scss";

export function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [autocompleteData, locationData, handleDropdownSearchChange, handleDropdownSearchSelectionChange, handleDropdownSearchSelect] = useDropdownSearch();
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

    useUpdate(() => {
        const { lat, lon } = locationData;
        fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
            setAppData({weather: weatherData, location: locationData});
            setSelectedWeatherData("current");
            setIsLoading(false);
        });
    }, [locationData]);

    const handleSelectWeekDay = (value: number) => {
        setSelectedWeatherData(value);
    }

    const _handleDropdownSearchSelect = (value: string) => {
        setIsLoading(true);
        handleDropdownSearchSelect(value);
    }

    const dropdownSearchEntries = useMemo(() => {
        return autocompleteData.map((entry, index) => entry.city)
    }, [autocompleteData]);

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                handleChange={handleDropdownSearchChange}
                handleSelectionChange={handleDropdownSearchSelectionChange}
                handleSelect={_handleDropdownSearchSelect}
                entries={dropdownSearchEntries}
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
