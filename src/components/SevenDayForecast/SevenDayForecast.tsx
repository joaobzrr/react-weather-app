import React, { useState, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { WeatherData } from "$services/fetchWeatherData";

type PropsType = {
    weatherData: WeatherData;
    onPressWeekDayButton: (value: number) => void;
}

export default function SevenDayForecast(props: PropsType) {
    const { weatherData, onPressWeekDayButton } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.daily.entries()) {
            const {iconCode, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            result.push(
                <WeekDayButton
                    key={index}
                    onPressWeekDayButton={onPressWeekDayButton}
                    weekDayIndex={index}
                    weekDayName={weekDayName}
                    iconCode={iconCode}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
                />
            );
        }
        return result;
    }, [weatherData]);

    return (
        <div className="SevenDayForecast flex justify-content-between">
            {buttons}
        </div>
    );
}
