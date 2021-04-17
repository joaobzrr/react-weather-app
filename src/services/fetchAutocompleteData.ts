import axios from "axios";
import { AutocompleteData } from "$src/types";

export default async function fetchAutocompleteData(text: string) {
    const key = __LOCATION_IQ_API_KEY__;
    const input = encodeURIComponent(text);
    const baseUrl = "https://api.locationiq.com/v1/autocomplete.php";
    const query = `?key=${key}&q=${input}&limit=20&tag=place:city&accept-language=en`;

    try {
        const response = await axios.get(baseUrl + query);
        const result: AutocompleteData = [];
        for (const item of response.data) {
            result.push({
                city: item.address.name,
                lat: item.lat,
                lon: item.lon
            });
        }
        return result;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
}
