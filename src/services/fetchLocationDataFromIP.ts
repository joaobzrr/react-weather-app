import axios, { AxiosResponse } from "axios";
import { LocationData } from "$types/common";

export default function fetchLocationDataFromIP() {
    const key = __BIG_DATA_CLOUD_KEY__;
    const baseUrl = "https://api.bigdatacloud.net/data/ip-geolocation";
    const query = `?localityLanguage=en&key=${key}`;
    return axios.get(baseUrl + query).then((response: AxiosResponse<any>) => {
        debugger;

        const { country: countryData, location: locationData } = response.data;
        const result: LocationData = {
            city:    locationData.city,
            country: countryData.name,
            lat:     locationData.latitude,
            lon:     locationData.longitude
        };
        return result;
    });
}
