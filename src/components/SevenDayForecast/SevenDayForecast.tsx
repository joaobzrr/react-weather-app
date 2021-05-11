import React, { useContext, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { WeatherData } from "$types/common";

type PropsType = {
    onSelectWeekDay: (value: number) => void;
    weatherData: WeatherData;
}

export default function SevenDayForecast(props: PropsType) {
    const { onSelectWeekDay, weatherData } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.daily.entries()) {
            const {iconCode, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            result.push(
                <WeekDayButton
                    handlePress={onSelectWeekDay}
                    maxTemperature={maxTemperature}
                    minTemperature={minTemperature}
                    iconCode={iconCode}
                    weekDayName={weekDayName}
                    weekDayIndex={index}
                    key={index}
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
