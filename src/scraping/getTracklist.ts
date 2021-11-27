import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import Log from "@frasermcc/log"
import { Track } from "../interfaces/Track";
import { TrackList } from "../interfaces/TrackList";

export async function getTracklist(url: string): Promise<TrackList> {
    const baseURL = "https://www.1001tracklists.com/"
    const AxiosInstance = axios.create();
    const tracklistURL = baseURL + "tracklist/" + url;

    const response = await AxiosInstance.get(tracklistURL).catch(error => {
        if (error.response) {
            Log.warn(`The tracklist was not found (error code ${error.response.status})`);
        }
    });

    if (response === undefined) {
        return undefined;
    }

    const html = (response as AxiosResponse).data;
    const pageHTML = cheerio.load(html);
    const tracksTable = pageHTML('.tlpTog');
    const tracklistData = pageHTML('#pageTitle');
    const tracklistName = tracklistData.text();

    const tracks: Track[] = [];

    tracksTable.each((i, el) => {
        const artworkURL = pageHTML(el).find(".artwork").attr("data-src");       
        const trackHTML = pageHTML(el).find("*[itemprop = 'tracks']");

        const fullTrackName = trackHTML.find('*[itemprop = "name"]').attr('content') ?? "ID - ID";
        const url = trackHTML.find('*[itemprop = "url"]').attr('content');

        const artist = fullTrackName.substr(0, fullTrackName.lastIndexOf("-")-1);
        const trackName = fullTrackName.substr(fullTrackName.lastIndexOf("-")+2);

        const prevURL = (i != 0) 
            ? pageHTML(tracksTable[i-1]).find('*[itemprop = "url"]').attr('content')
            : undefined;

        const nextURL = (i != tracksTable.length-1) 
            ? pageHTML(tracksTable[i+1]).find('*[itemprop = "url"]').attr('content')
            : undefined;
        
        const newTrack: Track = {
            fullTrackName: fullTrackName,
            artist: artist,
            trackName: trackName,
            albumArt: artworkURL,
            url: url,
            prevURL: prevURL,
            nextURL: nextURL
        }
        
        tracks.push(newTrack);
    })

    const trackList: TrackList = {
        tracks: tracks,
        name: tracklistName,
        url: tracklistURL
    };

    return trackList;
}