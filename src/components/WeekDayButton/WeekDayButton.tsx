import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import Button from "$components/Button";
import WeatherIcon from "$components/WeatherIcon";
import { ButtonPropsType } from "$types/common";

import "./WeekDayButton.scss";

type PropsType = ButtonPropsType & {
    selected:       boolean;
    maxTemperature: number;
    iconCode:       string;
    time:           string;
};

export default function WeekDayButton(props: PropsType) {
    const { selected, maxTemperature, iconCode, time, ...buttonProps } = props;

    const { classes, setClasses } = useClasses("WeekDayButton");

    useEffect(() => setClasses({WeekDayButton__selected: selected}), [selected]);

    return (
        <Button className={serializeClasses(classes)} {...buttonProps}>
            <p className="WeekDayButton_day">{time + ""}</p>
            <WeatherIcon
                iconCode={iconCode}
                className="WeekDayButton_icon"
            />
            <div className="WeekDayButton_temperature">
                {maxTemperature}º
            </div>
        </Button>
    );
}
