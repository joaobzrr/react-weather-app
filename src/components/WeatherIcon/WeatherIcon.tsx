import React, { useMemo } from "react";
import Icon from "$components/Icon";
import iconCodeToFileName from "$services/iconCodeToFileName";

type PropsType = {
    iconCode: string;
}

export default function WeatherIcon(props: PropsType) {
    const { iconCode } = props;
    const fileName = useMemo(() => iconCodeToFileName(iconCode), [iconCode]);
    return <Icon fileName={fileName} />;
}
