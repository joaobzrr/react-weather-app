import React from "react";
import { WeatherData } from "$services/fetchWeatherData";
import { LocationData } from "$services/fetchLocationData";

export type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type UseStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type NamedComponent<T> = React.ComponentType<T> & { _name?: string; };

export type AppData = {
    weather:  WeatherData;
    location: LocationData;
}
