import React, { useContext, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { AppData } from "$types/common";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
    appData: AppData;
}

export default function SevenDayForecast(props: PropsType) {
    const { onSelectWeatherData, appData } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of appData.weather.daily.entries()) {
            const {iconCode, maxTemperature, minTemperature} = data;
            const weekDayName = getWeekDayNameFromDate(data.dt, true);
            result.push(
                <WeekDayButton
                    handlePress={onSelectWeatherData}
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
