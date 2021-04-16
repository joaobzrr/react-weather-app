import React from "react";
import { WeatherData } from "$services/fetchWeatherData";

export type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type UseStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NamedComponent<T> = React.ComponentType<T> & { _name?: string; };

export type AppData = {
    weather:  WeatherData;
    location: LocationData;
}

export type LocationData = {
    city: string,
    lat: number;
    lon: number;
}

export type SelectedWeatherData = "current" | number;
