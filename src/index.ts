import { TrackInTracklist } from './interfaces/TrackInTracklist';
import { TrackList } from './interfaces/TrackList';
import { DJSet } from './interfaces/DJSet';
import { Track } from './interfaces/Track';
import { getTracklist } from './scraping/getTracklist';
import { getTrack } from "./scraping/getTrack";
import { searchTracklists } from './scraping/searchTracklists';


/*getTracklist("sex").then((tracks: TrackList | undefined) => {
    console.log(tracks);
});*/

/*getTrack("2hr36p45/k-motionz-all-night/index.html").then((track: Track) => {
    console.log(track);
});*/

searchTracklists("k motionz").then((res: any) => {
    console.log(res);
})

export { TrackInTracklist, TrackList, DJSet, Track, getTracklist, getTrack };