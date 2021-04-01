import React, { useEffect, useRef } from "react";
import WeatherIcon from "$components/WeatherIcon";
import "./WeekDayButton.scss";

type PropsType = {
    onPressWeekDayButton: (value: number) => void;
    weekDayIndex: number;
    weekDayName: string;
    icon: string;
    minTemperature: number;
    maxTemperature: number;
};

export default function WeekDayButton(props: PropsType) {
    const { onPressWeekDayButton, weekDayIndex, weekDayName, icon, minTemperature, maxTemperature } = props;

    const onClick = () => onPressWeekDayButton(weekDayIndex);

    const formatTemperature = (t: number) => t.toString() + " º";

    return (
        <div
            className="WeekDayButton"
            onClick={onClick}
        >
            <p className="WeekDayButton_day">{weekDayName}</p>
            <WeatherIcon src={icon} />
            <div className="WeekDayButton_temperature">
                <span className="WeekDayButton_max">
                    {formatTemperature(maxTemperature)}
                </span>
                <span className="WeekDayButton_min">
                    {formatTemperature(minTemperature)}
                </span>
            </div>
        </div>
    );
}
