import axios from 'axios';
import cheerio from 'cheerio';
import { Track } from './track';

const baseURL = "https://www.1001tracklists.com/"

const AxiosInstance = axios.create();

export async function getTracklist(url: string): Promise<Track[]> {
    const response = await AxiosInstance.get(baseURL + "tracklist/" + url);
    const html = response.data;
    const pageHTML = cheerio.load(html);
    const tracksTable = pageHTML('*[itemprop = "tracks"]');

    const tracksList: Track[] = [];


    tracksTable.each((i, el) => {
        const fullTrackName = pageHTML(el).find('*[itemprop = "name"]').attr('content');
        const url = pageHTML(el).find('*[itemprop = "url"]').attr('content');
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
            url: url,
            prevURL: prevURL,
            nextURL: nextURL
        }

        tracksList.push(newTrack);
    })

    return tracksList;;
}

getTracklist("h4gcxq1/k-motionz-ukf-on-air-hyper-vision-2020-07-03.html").then((tracks) => {
    console.log(tracks);
});