import React, { useEffect, FC } from "react";
import Button from "$components/Button";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import { makeClassName } from "$utils/common";
import { ButtonPropsType, MeasurementSystem } from "$types/common";
import "./MeasurementSystemButton.scss";

type PropsType = ButtonPropsType & {
    selected: boolean;
}

const MeasurementSystemButton: FC<PropsType> = props => {
    const { selected, ...buttonProps } = props;

    const {classes, setClasses} = useClasses("MeasurementSystemButton");

    useEffect(() => {
        setClasses({MeasurementSystemButton__selected: selected});
    }, [selected]);

    const className = makeClassName(buttonProps, serializeClasses(classes));

    return <Button className={className} {...buttonProps}/>;
}

export default MeasurementSystemButton;
