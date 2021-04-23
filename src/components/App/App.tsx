import React, { useState, useRef, useMemo } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import useOnce from "$hooks/useOnce";
import useAutocompleteData from "$hooks/useAutocompleteData";
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
    const [autocompleteData, fetchAutocompleteData, waitAutocompleteData] = useAutocompleteData();
    const [selectedWeatherData, setSelectedWeatherData] = useState<SelectedWeatherData>("current");
    const [isLoading, setIsLoading] = useState(true);

    const selectedDropdownEntryRef = useRef(0);

    useOnce(() => {
        fetchLocationDataFromIP().then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
                setAppData({weather: weatherData, location: locationData});
                setIsLoading(false);
            });
        });
    });

    const handleDropdownSearchChange = (value: string) => {
        if (value === "") {
            return;
        }

        fetchAutocompleteData(value);
    }

    const handleDropdownSearchSelect = (value: string) => {
        if (value === "") {
            return;
        }

        setIsLoading(true);
        waitAutocompleteData().then((autocompleteData: AutocompleteData) => {

            const index = selectedDropdownEntryRef.current;
            const locationData = autocompleteData[index];
            const { lat, lon } = locationData;

            fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
                setAppData({weather: weatherData, location: locationData});
                setSelectedWeatherData("current");
                setIsLoading(false);
            });
        });
    }

    const handleDropdownSearchSelectionChange = (index: number) => {
        selectedDropdownEntryRef.current = index;
    }

    const handleSelectWeekDay = (value: number) => {
        setSelectedWeatherData(value);
    }

    const dropdownSearchEntries = useMemo(() => {
        return autocompleteData.map((entry, index) => entry.city)
    }, [autocompleteData]);

    return (
        <div className="App flex flex-column">
            <DropdownSearch
                handleChange={handleDropdownSearchChange}
                handleSelectionChange={handleDropdownSearchSelectionChange}
                handleSelect={handleDropdownSearchSelect}
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
