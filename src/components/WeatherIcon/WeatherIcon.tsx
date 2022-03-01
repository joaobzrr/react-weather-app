import React, { useMemo } from "react";
import Icon from "$components/Icon";
import iconCodeToFileName from "$utils/iconCodeToFileName";
import { IconPropsType } from "$types/common";

type PropsType = Omit<IconPropsType, "fileName"> & {
    iconCode: string;
};

export default function WeatherIcon(props: PropsType) {
    const { iconCode, ...iconProps } = props;

    const fileName = useMemo(() => iconCodeToFileName(iconCode), [iconCode]);

    return (
        <Icon fileName={fileName} {...iconProps} />
    );
}
