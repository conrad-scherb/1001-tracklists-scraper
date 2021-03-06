import cheerio from "cheerio";
import { TrackInTracklist } from "../interfaces/TrackInTracklist";
import { TrackList } from "../interfaces/TrackList";
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)

export async function getTracklist(url: string, proxy: string | null = null): Promise<TrackList | undefined> {
    if (!url.startsWith("https://www.1001tracklists.com/tracklist/")) {
        url = "https://www.1001tracklists.com/tracklist/" + url;
    }

    let cmd = 'curl';
    if (proxy) {
        cmd += ` -x socks5://${proxy}`
    }

    const html = (await exec(`${cmd} -X GET -L "${url}"`)).stdout
    const pageHTML = cheerio.load(html);
    const tracksTable = pageHTML('.tlpTog');
    const tracklistData = pageHTML('#pageTitle');
    const tracklistName = tracklistData.text();

    const tracks: TrackInTracklist[] = [];

    tracksTable.each((i, el) => {
        const artworkURL = pageHTML(el).find(".artwork").attr("data-src");       
        const trackHTML = pageHTML(el).find("*[itemprop = 'tracks']");

        const fullTrackName = trackHTML.find('*[itemprop = "name"]').attr('content') ?? "ID - ID";
        const url = trackHTML.find('*[itemprop = "url"]').attr('content')?.substring(1);

        const artist = fullTrackName.substr(0, fullTrackName.lastIndexOf("-")-1);
        const trackName = fullTrackName.substr(fullTrackName.lastIndexOf("-")+2);

        const prevURL = (i != 0) 
            ? pageHTML(tracksTable[i-1]).find('*[itemprop = "url"]').attr('content')?.substring(1)
            : undefined;

        const nextURL = (i != tracksTable.length-1) 
            ? pageHTML(tracksTable[i+1]).find('*[itemprop = "url"]').attr('content')?.substring(1)
            : undefined;
        
        const newTrack: TrackInTracklist = {
            fullTrackName: fullTrackName,
            artist: artist,
            trackName: trackName,
            albumArt: artworkURL,
            url: (url != undefined ) ? "https://www.1001tracklists.com/" + url : undefined,
            id: (url != undefined ) ? url.substr(6, 8) : undefined,
            prevURL: (prevURL != undefined ) ? "https://www.1001tracklists.com/" + prevURL : undefined,
            nextURL: (nextURL != undefined ) ? "https://www.1001tracklists.com/" + nextURL : undefined
        }
        
        tracks.push(newTrack);
    })

    const trackList: TrackList = {
        tracks: tracks,
        name: tracklistName,
        url: url
    };

    return trackList;
}