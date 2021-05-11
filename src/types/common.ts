import React from "react";

export type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ResolveFunctionType<T> = (value?: T | PromiseLike<T>) => void;

export type RejectFunctionType  = (reason?: any) => void;

export type Deferrable<T> = {
    promise:     Promise<T>,
    resolve:     ResolveFunctionType<T>
    reject:      RejectFunctionType
}

export type UseStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NamedComponent<T> = React.ComponentType<T> & { _name?: string; };

export type ButtonPropsType = {
    onClick: () => void;
    className?: string;
}

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
    city:    string,
    country: string;
    lat:     number;
    lon:     number;
}

export type AppData = {
    weatherData:  WeatherData;
    locationData: LocationData;
}

export type MeasurementSystem = "metric"|"imperial";

export type AutocompleteData = LocationData[];
