import React, { useContext, useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import { AppDataContext } from "$contexts/AppDataContext";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
}

export default function SevenDayForecast(props: PropsType) {
    const { onSelectWeatherData } = props;

    const [appData, setAppData] = useContext(AppDataContext);

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
