import React from "react";

export type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Callback<T extends unknown[] = [], R = void> = (...args: T) => R;

export type ResolveFunctionType<T> = (value?: T | PromiseLike<T>) => void;

export type RejectFunctionType  = (reason?: any) => void;

export type Deferrable<T> = {
    promise:     Promise<T>,
    resolve:     ResolveFunctionType<T>
    reject:      RejectFunctionType
}

export type UseStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NamedComponent<T> = React.ComponentType<T> & { _name?: string; };

export type TextInputPropsType = {
    onChange:    Callback<[string]>;
    onEnter:     Callback<[string]>;
    onArrowUp:   Callback;
    onArrowDown: Callback;
    onClick:     Callback;
    onBlur:      Callback;
    value:       string;
}

export type IconPropsType = {
    fileName:   string;
    className?: string;
}

export type BaseWeatherData = {
    date:          Date;
    icon:          string;
    description:   string;
    humidity:      number;
    windSpeed:     number;
    windDirection: number;
}

export type CurrentWeatherData = BaseWeatherData & {
    temperature: number;
    precipitationProbability: number;
}

export type DailyWeatherData = BaseWeatherData & {
    weekday: string;
    temperature: number;
    maxTemperature: number;
    minTemperature: number;
    precipitationProbability: number;
}

export type HourlyWeatherData = CurrentWeatherData;

export type WeatherData = {
    current: CurrentWeatherData;
    daily:   DailyWeatherData[];
    hourly:  HourlyWeatherData[];
}

export type WeatherDataContainer = {
    metric:   WeatherData;
    imperial: WeatherData;
    timezone: string;
}

export type LocationData = {
    city:    string,
    country: string;
    lat:     number;
    lon:     number;
}

export type AppData = {
    weatherDataContainer: WeatherDataContainer;
    locationData:         LocationData;
}

export type AutocompleteData = LocationData[];
