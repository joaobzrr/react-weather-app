import React, { useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { Callback, WeatherData } from "$types/common";
import "./SevenDayForecast.scss";

type PropsType = {
    onSelectWeekDay: Callback<[number]>;
    weatherData:     WeatherData;
    selectedWeekDay: number;
}

export default function SevenDayForecast(props: PropsType) {
    const { onSelectWeekDay, weatherData, selectedWeekDay } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.daily.entries()) {
            const {iconCode, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            const selected = index === selectedWeekDay;
            result.push(
                <WeekDayButton
                    onClick={() => onSelectWeekDay(index)}
                    selected={selected}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
                    iconCode={iconCode}
                    weekDayName={weekDayName}
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
