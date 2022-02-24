import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import useOnce from "$hooks/useOnce";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import {
    AppData,
    LocationData,
    WeatherData,
    MeasurementSystem
} from "$types/common";
import "./App.scss";

import { WeatherDataContainer } from "$src/WeatherDataContainer";

export default function App() {
    const [appData, setAppData] = useState<AppData>(null!);
    const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("metric");
    const [selectedWeekDay, setSelectedWeekDay] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    useOnce(() => {
        fetchLocationDataFromIP().then((locationData: LocationData) => {
            const { lat, lon } = locationData;
            WeatherDataContainer.fetch(lat, lon).then((weatherDataContainer: WeatherDataContainer) => {
                setAppData({weatherDataContainer, locationData});
                setIsLoading(false);
            });
        });
    });

    const handleBeginLoadingAutocompleteData = () => {
        setIsLoading(true);
    }

    const handleEndLoadingAutocompleteData = (locationData: LocationData) => {
        const { lat, lon } = locationData;
        WeatherDataContainer.fetch(lat, lon).then((weatherDataContainer: WeatherDataContainer) => {
            setAppData({weatherDataContainer, locationData});
            setSelectedWeekDay(-1);
            setIsLoading(false);
        });
    }

    const handleSelectMeasurementSystem = (measurementSystem: MeasurementSystem) => {
        setMeasurementSystem(measurementSystem);
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
                onSelectMeasurementSystem={handleSelectMeasurementSystem}
                onSelectWeekDay={handleSelectWeekDay}
                appData={appData}
                measurementSystem={measurementSystem}
                selectedWeekDay={selectedWeekDay}
                isLoading={isLoading}
            />
        </div>
    );
}
