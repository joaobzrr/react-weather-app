import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import Button from "$components/Button";
import WeatherIcon from "$components/WeatherIcon";
import { ButtonPropsType } from "$types/common";

import "./WeekDayButton.scss";

type PropsType = ButtonPropsType & {
    selected:       boolean;
    minTemperature: number;
    maxTemperature: number;
    iconCode:       string;
    weekDayName:    string;
};

export default function WeekDayButton(props: PropsType) {
    const { selected, weekDayName, iconCode, minTemperature, maxTemperature, ...buttonProps } = props;

    const { classes, setClasses } = useClasses("WeekDayButton");

    useEffect(() => setClasses({WeekDayButton__selected: selected}), [selected]);

    return (
        <Button className={serializeClasses(classes)} {...buttonProps}>
            <p className="WeekDayButton_day">{weekDayName}</p>
            <WeatherIcon
                iconCode={iconCode}
                className="WeekDayButton_icon"
            />
            <div className="WeekDayButton_temperature">
                <span className="WeekDayButton_max">
                    {maxTemperature}º
                </span>
                <span className="WeekDayButton_min">
                    {minTemperature}º
                </span>
            </div>
        </Button>
    );
}
