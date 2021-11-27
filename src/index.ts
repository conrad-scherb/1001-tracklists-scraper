import { TrackInTracklist } from './interfaces/TrackInTracklist';
import { TrackList } from './interfaces/TrackList';
import { DJSet } from './interfaces/DJSet';
import { Track } from './interfaces/Track';
import { TracklistSearchResult } from './interfaces/TracklistSearchResult';
import { getTracklist } from './scraping/getTracklist';
import { getTrack } from "./scraping/getTrack";
import { searchTracklists } from './scraping/searchTracklists';

getTracklist("2qv21n29/andy-c-ukf-on-air-one7four-stream-dandbtv-locked-in-united-kingdom-2020-06-12.html").then((tracklist: TrackList | undefined) => {
    console.log(tracklist);
})

/*
getTrack("2hr36p45/k-motionz-all-night/index.html").then((track: Track | undefined) => {
    console.log(track);
});
*/

/*searchTracklists("k motionz").then((res: any) => {
    console.log(res);
})*/

export { TrackInTracklist, TrackList, DJSet, Track, TracklistSearchResult, getTracklist, getTrack, searchTracklists };