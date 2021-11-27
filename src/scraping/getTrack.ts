import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import Log from "@frasermcc/log"
import { DJSet } from "../interfaces/DJSet";
import { Track } from "../interfaces/Track";

export async function getTrack(url: string): Promise<Track | undefined> {
    const baseURL = "https://www.1001tracklists.com/"
    const AxiosInstance = axios.create();
    const trackURL = baseURL + "track/" + url;
    const response: AxiosResponse = await AxiosInstance.get(trackURL);

    const html = (response as AxiosResponse).data;
    const pageHTML = cheerio.load(html);
    const setsTable = pageHTML('.bItm');
    const trackData = pageHTML('#pageTitle');
    const trackArtist = trackData.find("a").html();
    const trackName = trackData.find(".spR").html();

    if (trackArtist === null && trackName === null) {
        Log.warn(`The track was not found`);
        return undefined;
    }

    const sets: DJSet[] = [];

    setsTable.each((_i, el) => {
        const setName = pageHTML(el).find(".bTitle").text().substring(1).slice(0, -1);
        let setLink = pageHTML(el).find("a")?.attr("href")?.substring(1);
        setLink = setLink?.substr(0, setLink?.lastIndexOf("#"));
        
        const set: DJSet = { 
            name: setName,
            url: baseURL + setLink
        }

        sets.push(set);
    })

    const track: Track = {
        title: trackName,
        url: trackURL,
        artist: trackArtist,
        appearances: sets
    };

    return track;
}
