import React, { useState, useMemo } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import useOnce from "$hooks/useOnce";
import useDelay from "$hooks/useDelay";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
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
    const [autocompleteData, setAutocompleteData] =
        useState<AutocompleteData>([]);
    const [selectedWeatherData, setSelectedWeatherData] =
        useState<SelectedWeatherData>("current");
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        setIsLoading(true);
        fetchLocationDataFromIP().then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
                setAppData({weather: weatherData, location: locationData});
                setIsLoading(false);
            });
        });
    });

    const fetchAndUpdateAutocompleteData = useDelay((value: string) => {
        fetchAutocompleteData(value).then((data: AutocompleteData) => {
            setAutocompleteData(data);
        });
    }, 500);

    const handleDropdownSearchChange = (value: string) => {
        if (value === "") {
            return;
        }

        fetchAndUpdateAutocompleteData(value);
    }

    const handleDropdownSearchSelect = (value: string) => {
        if (value === "") {
            return;
        }

        const locationData = autocompleteData[0];
        const { lat, lon } = locationData;

        setIsLoading(true);

        fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
            setAppData({weather: weatherData, location: locationData});
            setSelectedWeatherData("current");
            setIsLoading(false);
        });
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
