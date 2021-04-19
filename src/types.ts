import React from "react";

export type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type UseStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NamedComponent<T> = React.ComponentType<T> & { _name?: string; };

export type TimeoutType = ReturnType<typeof setTimeout>;

type BaseWeatherData = {
    dt:            Date;
    description:   string;
    iconCode:      string;
    humidity:      number;
    windSpeed:     number;
    precipitation: number;
}

export type CurrentWeatherData = BaseWeatherData & {
    temperature: number;
}

export type ForecastedWeatherData = BaseWeatherData & {
    maxTemperature: number;
    minTemperature: number;
}

export type WeatherData = {
    current: CurrentWeatherData;
    daily:   ForecastedWeatherData[]
}

export type LocationData = {
    city: string,
    lat: number;
    lon: number;
}

export type AppData = {
    weather:  WeatherData;
    location: LocationData;
}

export type SelectedWeatherData = "current" | number;

export type AutocompleteData = LocationData[];
