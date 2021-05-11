import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import { MeasurementSystem } from "$types/common";
import "./MeasurementSystemButton.scss";

type PropsType = {
    onClick: () => void;
    isSelected: boolean;
    children?: React.ReactNode;
    className: string;
}

// @Todo: Replace this with a general Button component.
export default function MeasurementSystemButton(props: PropsType) {
    const { onClick, isSelected, children, className } = props;

    const {classes, setClasses} = useClasses("MeasurementSystemButton");

    useEffect(() => {
        setClasses({MeasurementSystemButton__selected: isSelected});
    }, [isSelected]);

    const _className = `${serializeClasses(classes)} ${className}`;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        onClick();
    }

    return (
        <span onClick={handleClick} className={_className}>
            {children}
        </span>
    );
}
