import React, { useEffect } from "react";
import WeatherIcon from "$components/WeatherIcon";

import "./HourlyForecastItem.scss";

type PropsType = {
    selected:       boolean;
    maxTemperature: number;
    iconCode:       string;
    time:           string;
};

export default function HourlyForecastItem(props: PropsType) {
    const { selected, maxTemperature, iconCode, time } = props;

    return (
        <span className="HourlyForecastItem">
            <span className="HourlyForecastItem_day">{time + ""}</span>
            <WeatherIcon
                iconCode={iconCode}
                className="HourlyForecastItem_icon"
            />
            <span className="HourlyForecastItem_temperature">
                {maxTemperature}&#x00B0;
            </span>
        </span>
    );
}
