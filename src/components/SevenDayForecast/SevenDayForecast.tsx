import React, { useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { Callback, DailyWeatherData } from "$types/common";
import "./SevenDayForecast.scss";

type PropsType = {
    onSelectWeekDay: Callback<[number]>;
    weatherData:     DailyWeatherData[];
    selectedWeekDay: number;
}

export default function SevenDayForecast(props: PropsType) {
    const { onSelectWeekDay, weatherData, selectedWeekDay } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.entries()) {
            const { weekday, icon, maxTemperature, minTemperature } = data;
            const weekDayName = weekday.substring(0, 3);
            const selected = index === selectedWeekDay;
            result.push(
                <WeekDayButton
                    onClick={() => onSelectWeekDay(index)}
                    selected={selected}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
                    iconCode={icon} // @nocommit
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
