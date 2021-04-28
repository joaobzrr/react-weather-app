import axios, { AxiosResponse } from "axios";
import { AutocompleteData } from "$src/types";

type ReturnValueType = [Promise<AutocompleteData>, () => void];

export default function fetchAutocompleteData(text: string): ReturnValueType {
    const key = __LOCATION_IQ_API_KEY__;
    const input = encodeURIComponent(text);
    const baseUrl = "https://api.locationiq.com/v1/autocomplete.php";
    const limit = 5;
    const query = `?key=${key}&q=${input}&limit=${limit}&tag=place:city&accept-language=en`;

    const cancelTokenSource = axios.CancelToken.source();
    const promise = (async () => {
        let response: AxiosResponse<any> = null!;

        while (true) {
            try {
                response = await axios.get(baseUrl + query, {
                    cancelToken: cancelTokenSource.token
                });
                break;
            } catch (error) {
                if (error.response.status !== 429) {
                    throw error;
                }
            }
        }

        const result: AutocompleteData = [];
        for (const item of response.data) {
            result.push({
                city:    item.address.name,
                country: item.address.country,
                lat:     item.lat,
                lon:     item.lon
            });
        }

        return result;
    })();

    const cancel = () => {
        cancelTokenSource.cancel();
    }

    return [promise, cancel];
}
