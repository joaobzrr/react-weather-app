import React, { useState, useContext, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import { AppDataContext } from "$contexts/AppDataContext";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { WeatherData } from "$src/types";

type PropsType = {
    handleSelectWeekDay: (value: number) => void;
}

export default function SevenDayForecast(props: PropsType) {
    const { handleSelectWeekDay } = props;

    const [appData, setAppData] = useContext(AppDataContext);

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of appData.weather.daily.entries()) {
            const {iconCode, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            result.push(
                <WeekDayButton
                    handlePress={handleSelectWeekDay}
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
    }, [appData.weather]);

    return (
        <div className="SevenDayForecast flex justify-content-between">
            {buttons}
        </div>
    );
}
