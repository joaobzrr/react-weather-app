import React, { useEffect, FC } from "react";
import Button from "$components/Button";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import { popFromObject } from "$utils/common";
import { ButtonPropsType } from "$types/common";
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

    // @Todo: Remember to change this when we update serializeClasses
    // to handle arrays.
    const className = [
        popFromObject(buttonProps, "className", ""),
        serializeClasses(classes)
    ].join(" ");

    return <Button className={className} {...buttonProps}/>;
}

export default MeasurementSystemButton;
