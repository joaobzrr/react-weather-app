import React, { useMemo } from "react";
import WeekDayButton from "$components/WeekDayButton";
import { HourlyWeatherData } from "$types/common";
import "./HourlyForecast.scss";

type PropsType = {
    weatherData: HourlyWeatherData[];
}

export default function HourlyForecast(props: PropsType) {
    const { weatherData } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.slice(0, 6).entries()) {
            const { temperature, icon, time } = data;

            result.push(
                <WeekDayButton
                    selected={false}
                    maxTemperature={temperature}
                    iconCode={icon}
                    time={time}
                    onClick={() => 1}
                    key={index}
                />
            );
        }
        return result;
    }, [weatherData]);

    return (
        <div className="HourlyForecast">
            {buttons}
        </div>
    );
}
