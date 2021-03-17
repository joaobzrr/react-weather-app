import React, { useState, useEffect } from "react";
import WeekDayButton from "$components/WeekDayButton";
import "./SevenDayForecast.scss";
import { getWeekdayFromDate } from "$src/utils";
import { WeatherData } from "$src/fetchWeatherData";

type PropsType = {
    weatherData: WeatherData;
}

export default function SevenDayForecast(props: PropsType) {
    const { weatherData } = props;

    // @Todo: Memoize this.
    const buttons = [];
    for (const [index, data] of weatherData.daily.entries()) {
        const weekday = getWeekdayFromDate(data.dt);

        buttons.push(
            <WeekDayButton
                day={weekday}
                icon={data.icon}
                maxTemperature={data.maxTemperature}
                minTemperature={data.minTemperature}
                key={index}
            />
        );
    }

    return (
        <div className="SevenDayForecast">
            {buttons}
        </div>
    );
}
