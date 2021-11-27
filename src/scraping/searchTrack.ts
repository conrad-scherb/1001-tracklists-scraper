import axios from "axios";
import { TrackSearchResult } from "../interfaces/TrackSearchResult";

export async function searchTracks(query: string, num = 9999): Promise<TrackSearchResult[] | undefined> {
    const baseURL = "htttps://www.1001tracklists.com/ajax/search_track.php?p="
    const urlSuffix = "&noIDFieldCheck=true&fixedMode=true&sf=p"
    const url = baseURL + query + urlSuffix;
    const AxiosInstance = axios.create();

    const response = await AxiosInstance.get(url);
    let results = response.data.data;
    
    if (results[0].informal === "nothing found") {
        return undefined;
    }

    let trackResults: TrackSearchResult[] = [];

    for (let i = 0; i < Math.min(num, results.length); i++) {
        const artist = results[i].properties[0].properties.artistname;
        const name = results[i].properties.trackname;
        const url = "https://www.1001tracklists.com/track/" + results[i].properties.id_unique + "/" + results[i].properties.shorttrackname.replaceAll(" ", "-") + ".html"

        console.log(results[i].properties);
        const track: TrackSearchResult = {
            trackName: name,
            artist: artist,
            url: url
        }

        trackResults.push(track);
    }
    
    return trackResults;
}