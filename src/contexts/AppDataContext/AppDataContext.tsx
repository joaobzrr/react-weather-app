import React, { useState, useEffect, createContext } from "react";
import { WeatherData } from "$services/fetchWeatherData";
import { LocationData } from "$services/fetchLocationData";
import { AppData, UseStateReturnType } from "$types/global";

export const AppDataContext = createContext<UseStateReturnType<AppData>>(null!);

export const AppDataProvider: React.FC<{data: AppData}> = ({data, children}) => {
    const [appData, setAppData] = useState<AppData>(null!);

    useEffect(() => setAppData(data), [data]);

    return (
        <AppDataContext.Provider value={[appData, setAppData]}>
            {children}
        </AppDataContext.Provider>
    );
}
