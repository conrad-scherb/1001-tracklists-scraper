import cheerio from "cheerio";
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)

// Takes a tracklist URL and a track ID, then returns the track IDs of the adjacent tracks.
export async function findAdjacentTracks(tracklistURL: string, trackID: string, proxy: string | null = null): Promise<string[] | undefined> {
    if (!tracklistURL.startsWith("https://www.1001tracklists.com/tracklist/")) {
        tracklistURL = "https://www.1001tracklists.com/tracklist/" + tracklistURL;
    }

    let cmd = 'curl';
    if (proxy) {
        cmd += ` -x socks5://${proxy}`
    }

    const html = (await exec(`${cmd} -X GET -L "${tracklistURL}"`)).stdout

    const pageHTML = cheerio.load(html);

    const tracksTable = pageHTML("#tlTab")
    const inputTrackNumber = parseInt(tracksTable.find(`*[data-trackid = '${trackID}']`).attr("data-trno") ?? "-2");

    // Get the previous track
    const previousTrackID = tracksTable.find(`*[data-trno = '${inputTrackNumber - 1}']`).attr("data-trackid");
    const nextTrackID = tracksTable.find(`*[data-trno = '${inputTrackNumber + 1}']`).attr("data-trackid");

    let output: string[] = [];

    if (previousTrackID !== undefined) {
        output.push(previousTrackID);
    }

    if (nextTrackID !== undefined) {
        output.push(nextTrackID);
    }

    return output
}