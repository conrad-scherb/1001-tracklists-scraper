import { Track } from './interfaces/Track';
import { TrackList } from './interfaces/TrackList';
import { getTracklist } from './scraping/getTracklist';

getTracklist("h4gcxq1/k-motionz-ukf-on-air-hyper-vision-2020-07-03.html").then((tracks: TrackList) => {
    console.log(tracks);
});

export { Track, TrackList, getTracklist };