import React, { useContext }  from "react";
import SevenDayForecast from "$components/SevenDayForecast";
import WeatherIcon from "$components/WeatherIcon";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import { AppDataContext } from "$contexts/AppDataContext";
import { SelectedWeatherData } from "$types/global";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$services/fetchWeatherData";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
    selectedWeatherData: SelectedWeatherData;
};

function WeatherInfo(props: PropsType) {
    const { onSelectWeatherData, selectedWeatherData } = props;

    const [appData, setAppData] = useContext(AppDataContext);
    const city = appData.location.city;

    const data = (selectedWeatherData === "current") ?
        appData.weather.current :
        appData.weather.daily[selectedWeatherData];

    const { description, iconCode, precipitation, humidity, windSpeed } = data;
    const temperature = ("temperature" in data) ? data.temperature : data.maxTemperature;
    const day = getWeekDayNameFromDate(data.dt);

    return (
        <div className="WeatherInfo">
            <div className="WeatherInfo_inner1">
                <div className="WeatherInfo_city">{city}</div>
                <div className="flex justify-content-between">
                    <div>
                        <span className="WeatherInfo_temperature">
                            {temperature}º
                        </span>
                    </div>
                    <div className="WeatherInfo_inner4 flex">
                        <div className="WeatherInfo_inner5 flex flex-column justify-content-center align-items-flex-end">
                            <div className="WeatherInfo_description">{description}</div>
                            <div className="WeatherInfo_details flex flex-column align-items-flex-end">
                                <div>Precipitation: {precipitation}%</div>
                                <div>Humidity: {humidity}%</div>
                                <div>Wind: {windSpeed} km/h</div>
                            </div>
                        </div>
                        <WeatherIcon iconCode={iconCode}/>
                    </div>
                </div>
            </div>
            <SevenDayForecast
                onSelectWeatherData={onSelectWeatherData}
            />
        </div>
    );
}

WeatherInfo.displayName = "WeatherInfo";

export default withContainer(withLoading(WeatherInfo), {
    className: "flex justify-content-center align-items-center"
});
