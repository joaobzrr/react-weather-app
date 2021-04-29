import axios, { AxiosResponse } from "axios";
import { LocationData } from "$types/common";

export default function fetchLocationDataFromIP() {
    const key = __IPSTACK_API_KEY__;
    const baseUrl = "http://api.ipstack.com/check";
    const query = `?access_key=${key}`;
    return axios.get(baseUrl + query).then((response: AxiosResponse<any>) => {
        const { city, country, latitude, longitude } = response.data;
        const result: LocationData = {
            city:    city,
            country: country,
            lat:     latitude,
            lon:     longitude
        };
        return result;
    });
}
