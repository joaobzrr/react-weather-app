export default async function fetchCoordinates(text: string) {
    const key = __LOCATION_IQ_API_KEY__;
    const input = encodeURIComponent(text);
    const baseUrl = "https://api.locationiq.com/v1/autocomplete.php";
    const query = `?key=${key}&q=${input}&limit=20&tag=place:city&accept-language=en`;

    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        return {
            city: data[0].address.name,
            lat:  data[0].lat,
            lon:  data[0].lon
        }
    });
}
