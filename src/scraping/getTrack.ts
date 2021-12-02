import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import Log from "@frasermcc/log"
import { DJSet } from "../interfaces/DJSet";
import { Track } from "../interfaces/Track";
import { SocksProxyAgent } from "socks-proxy-agent";

export async function getTrack(url: string, proxy: string | null = null): Promise<Track | undefined> {
    if (!url.startsWith("https://www.1001tracklists.com/track/")) {
        url = "https://www.1001tracklists.com/track/" + url;
    }

    const AxiosInstance = axios.create();

    if (proxy) {
        Log.info(`Getting track for ${url} using proxy ` + proxy);
        const proxyServer = `socks5://${proxy}`;
        const agent = new SocksProxyAgent(proxyServer);
        AxiosInstance.defaults.httpAgent = agent;
    }

    const response = await AxiosInstance.get(url).catch(error => {
        if (error.response) {
            Log.warn(`The track was not found (error code ${error.response.status})`);
        }
    });

    if (response === undefined) {
        return undefined;
    }

    const html = (response as AxiosResponse).data;
    const pageHTML = cheerio.load(html);
    const setsTable = pageHTML('.bItm');
    const trackData = pageHTML('#pageTitle');
    const pageCss = pageHTML('style').html();
    const outerMatches = /(?<=@media\(min-width: 800px\) { #artworkLeft)(.*?)(?=;} })/.exec(pageCss as string)
    const urlMatches = /(?<=url\(')(.*?)(?='\))/.exec(outerMatches?.[0] as string)
    const artworkURL = urlMatches?.[0] as string;

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
            url: "https://www.1001tracklists.com/" + setLink
        }

        sets.push(set);
    })

    const track: Track = {
        title: trackName,
        url: url,
        artist: trackArtist,
        appearances: sets,
        artwork: artworkURL
    };

    return track;
}
