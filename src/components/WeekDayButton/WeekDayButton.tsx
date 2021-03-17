import React, { useEffect, useRef } from "react";
import WeatherIcon from "$components/WeatherIcon";
import "./WeekdayButton.scss";

type PropsType = {
    day: string;
    icon: string;
    minTemperature: number;
    maxTemperature: number;
};

export default function WeekdayButton(props: PropsType) {
    const { day, icon, minTemperature, maxTemperature } = props;

    const formatTemperature = (t: number) => t.toString() + " º";

    return (
        <div className="WeekdayButton">
            <p className="WeekdayButton_day">{day}</p>
            <WeatherIcon src={icon} />
            <div className="WeekdayButton_temperature">
                <span className="WeekdayButton_max">
                    {formatTemperature(maxTemperature)}
                </span>
                <span className="WeekdayButton_min">
                    {formatTemperature(minTemperature)}
                </span>
            </div>
        </div>
    );
}
