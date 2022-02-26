import React, { useMemo } from "react";
import {
    LocalDateTime,
    ZonedDateTime,
    ZoneId,
    DateTimeFormatter,
    nativeJs
} from "@js-joda/core";
import "@js-joda/timezone";

import WeekDayButton from "$components/WeekDayButton";
import { HourlyWeatherData } from "$types/common";
import "./HourlyForecast.scss";

type PropsType = {
    weatherData: HourlyWeatherData[];
    timezone:    string;
}

export default function HourlyForecast(props: PropsType) {
    const { weatherData, timezone } = props;

    const buttons = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.entries()) {
            const { date, temperature, icon } = data;

            const dt = LocalDateTime.from(nativeJs(date)).atZone(ZoneId.SYSTEM).withZoneSameInstant(ZoneId.of(timezone));
            const timeString = (index > 0) ?  dt.format(DateTimeFormatter.ofPattern("HH:mm")) :"NOW";

            result.push(
                <WeekDayButton
                    selected={false}
                    maxTemperature={temperature}
                    iconCode={icon}
                    time={timeString}
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
