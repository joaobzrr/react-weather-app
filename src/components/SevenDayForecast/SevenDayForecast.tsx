import React, { useState, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import "./SevenDayForecast.scss";
import { getWeekdayFromDate } from "$src/utils";
import { WeatherData } from "$src/fetchWeatherData";

type PropsType = {
    weatherData: WeatherData;
}

export default function SevenDayForecast(props: PropsType) {
    const { weatherData } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.daily.entries()) {
            const {icon, maxTemperature, minTemperature} = data;
            const weekday = getWeekdayFromDate(data.dt);
            result.push(
                <WeekDayButton
                    day={weekday}
                    icon={icon}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
                    key={index}
                />
            );
        }
        return result;
    }, [weatherData]);

    return (
        <div className="SevenDayForecast">
            {buttons}
        </div>
    );
}
