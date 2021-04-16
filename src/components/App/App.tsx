import React, { useState } from "react";
import DropdownSearch from "$components/DropdownSearch";
import WeatherInfo from "$components/WeatherInfo";
import withContainer from "$components/withContainer";
import { AppDataProvider } from "$contexts/AppDataContext";
import fetchWeatherData from "$services/fetchWeatherData";
import fetchAutocompleteData from "$services/fetchAutocompleteData";
import fetchLocationDataFromIP from "$services/fetchLocationDataFromIP";
import { AppData, LocationData, SelectedWeatherData } from "$types/global";
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

    const onInputEnter = (value: string) => {
        setIsLoading(true);

        fetchAutocompleteData(value).then((locationData: LocationData[]) => {
            const { lat, lon } = locationData[0];
            fetchWeatherData(lat, lon).then((weatherData: WeatherData) => {
                setAppData({weather: weatherData, location: locationData[0]});
                setSelectedWeatherData("current");
                setIsLoading(false);
            });
        }).catch(console.error);
    }

    const onPressWeekDayButton = (value: number) => setSelectedWeatherData(value);

    return (
        <div className="App flex flex-column">
            <DropdownSearch onInputEnter={onInputEnter} />
            <AppDataProvider data={appData}>
                <WeatherInfo
                    onSelectWeatherData={onPressWeekDayButton}
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
