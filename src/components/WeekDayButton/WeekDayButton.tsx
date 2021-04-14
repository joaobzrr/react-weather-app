import React, { useEffect, useRef } from "react";
import WeatherIcon from "$components/WeatherIcon";
import { formatTemperature } from "$src/utils";
import "./WeekDayButton.scss";

type PropsType = {
    onPress: (value: number) => void;
    weekDayIndex: number;
    weekDayName: string;
    iconCode: string;
    minTemperature: number;
    maxTemperature: number;
};

export default function WeekDayButton(props: PropsType) {
    const { onPress, weekDayIndex, weekDayName, iconCode, minTemperature, maxTemperature } = props;

    const onClick = () => onPress(weekDayIndex);

    return (
        <div
            className="WeekDayButton flex flex-column justify-content-center align-items-center"
            onClick={onClick}
        >
            <p className="WeekDayButton_day">{weekDayName}</p>
            <WeatherIcon iconCode={iconCode} />
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
