import React, { useState, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import "./SevenDayForecast.scss";
import { getWeekDayNameFromDate } from "$src/utils";
import { WeatherData } from "$services/WeatherData";

type PropsType = {
    weatherData: WeatherData;
    onPressWeekDayButton: (value: number) => void;
}

export default function SevenDayForecast(props: PropsType) {
    const { weatherData, onPressWeekDayButton } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.daily.entries()) {
            const {icon, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            result.push(
                <WeekDayButton
                    key={index}
                    onPressWeekDayButton={onPressWeekDayButton}
                    weekDayIndex={index}
                    weekDayName={weekDayName}
                    icon={icon}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
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
