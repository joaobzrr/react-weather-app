import axios, { AxiosResponse } from "axios";
import { LocationData } from "$types/global";

export default async function fetchLocationDataFromIP() {
    const key = __IPSTACK_API_KEY__;
    const baseUrl = "http://api.ipstack.com/check";
    const query = `?access_key=${key}`;
    return axios.get(baseUrl + query).then((response: AxiosResponse<any>) => {
        const { city, latitude, longitude } = response.data;
        const result: LocationData = {
            city: city,
            lat: latitude,
            lon: longitude
        };
        return result;
    });
}
