import React, { useMemo } from "react";
import MeasurementSystemButton from "$components/MeasurementSystemButton";
import { MeasurementSystem } from "$types/common";
import "./MeasurementSystemSelector.scss";

type PropsType = {
    onSelectMeasurementSystem: (measurementSystem: MeasurementSystem) => void;
    measurementSystem: MeasurementSystem;
}

export default function MeasurementSystemSelector(props: PropsType) {
    const { onSelectMeasurementSystem, measurementSystem } = props;

    return (
        <div className="MeasurementSystemSelector">
            <MeasurementSystemButton
                onClick={() => onSelectMeasurementSystem("metric")}
                selected={measurementSystem === "metric"}
                className="MeasurementSystemSelector_button MeasurementSystemSelector_first"
            >
                Cº
            </MeasurementSystemButton>
            <MeasurementSystemButton
                onClick={() => onSelectMeasurementSystem("imperial")}
                selected={measurementSystem === "imperial"}
                className="MeasurementSystemSelector_button"
            >
                Fº
            </MeasurementSystemButton>
        </div>
    );
}
