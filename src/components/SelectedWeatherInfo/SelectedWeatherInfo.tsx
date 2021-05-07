import React from "react";
import WeatherIcon from "$components/WeatherIcon";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import {
    NormalizedWeatherData,
    LocationData
} from "$types/common";
import "./SelectedWeatherInfo.scss";

type PropsType = {
    weatherData: NormalizedWeatherData;
    locationData: LocationData;
}

export default function SelectedWeatherInfo(props: PropsType) {
    const { weatherData, locationData } = props;

    return (
        <div className="SelectedWeatherInfo">
            <div className="SelectedWeatherInfo_city">{locationData.city}</div>
            <div className="flex justify-content-between">
                <div>
                    <span className="SelectedWeatherInfo_temperature">
                        {weatherData.temperature}º
                    </span>
                </div>
                <div className="flex">
                    <div className="mr2 flex flex-column justify-content-center align-items-flex-end">
                        <div className="SelectedWeatherInfo_description">{weatherData.description}</div>
                        <div className="SelectedWeatherInfo_details flex flex-column align-items-flex-end">
                            <div>Precipitation: {weatherData.precipitation}%</div>
                            <div>Humidity: {weatherData.humidity}%</div>
                            <div>Wind: {weatherData.windSpeed} km/h</div>
                        </div>
                    </div>
                    <WeatherIcon iconCode={weatherData.iconCode}/>
                </div>
            </div>
        </div>
    );
}
