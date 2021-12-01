import { TrackInTracklist } from './interfaces/TrackInTracklist';
import { TrackList } from './interfaces/TrackList';
import { DJSet } from './interfaces/DJSet';
import { Track } from './interfaces/Track';
import { TracklistSearchResult } from './interfaces/TracklistSearchResult';
import { TrackSearchResult } from './interfaces/TrackSearchResult';
import { getTracklist } from './scraping/getTracklist';
import { getTrack } from "./scraping/getTrack";
import { searchTracklists } from './scraping/searchTracklists';
import { searchTracks } from './scraping/searchTrack';
import { findAdjacentTracks } from './scraping/findAdjacentTracks';

findAdjacentTracks("https://www.1001tracklists.com/tracklist/1mk5z2w1/rene-lavice-north-base-drum-and-bass-show-2021-10-18.html#tr_141n9rwx","141n9rwx", "195.15.240.27:1080").then((resp) => console.log(resp));

export { TrackInTracklist, TrackList, DJSet, Track, TracklistSearchResult, TrackSearchResult, getTrack, getTracklist, searchTracklists, searchTracks, findAdjacentTracks };