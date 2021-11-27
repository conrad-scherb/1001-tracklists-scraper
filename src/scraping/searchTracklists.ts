import axios from "axios";
import { TracklistSearchResult } from "../interfaces/TracklistSearchResult";

export async function searchTracklists(query: string): Promise<TracklistSearchResult[] | undefined> {
    const baseURL = "htttps://www.1001tracklists.com/ajax/search_tracklist.php?p="
    const urlSuffix = "&noIDFieldCheck=true&fixedMode=true&sf=p"
    const url = baseURL + query + urlSuffix;
    const AxiosInstance = axios.create();

    const response = await AxiosInstance.get(url);
    let results = response.data.data;
    
    if (results[0].informal === "nothing found") {
        return undefined;
    }

    let tracks: TracklistSearchResult[] = [];

    for (let result of response.data.data) {
        const tracklistName = result.properties.tracklistname
        const tracklistURL =  "https://www.1001tracklists.com/tracklist/" + result.properties.id_unique + "/" + result.properties.url_name.replaceAll(" ", "-") + ".html"
        const track: TracklistSearchResult = {
            name: tracklistName,
            url: tracklistURL
        }

        tracks.push(track);
    }

    return tracks
}