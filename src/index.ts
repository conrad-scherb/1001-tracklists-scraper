import { TrackInTracklist } from './interfaces/TrackInTracklist';
import { TrackList } from './interfaces/TrackList';
import { DJSet } from './interfaces/DJSet';
import { Track } from './interfaces/Track';
import { getTracklist } from './scraping/getTracklist';
import { getTrack } from "./scraping/getTrack";

/*
getTracklist("h4gcxq1/k-motionz-ukf-on-air-hyper-vision-2020-07-03.html").then((tracks: TrackList) => {
    console.log(tracks);
});*/

getTrack("2hr36p45/k-motionz-all-night/index.html").then((track: Track) => {
    console.log(track);
});


export { TrackInTracklist, TrackList, DJSet, Track, getTracklist, getTrack };