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

//getTrack("26hk1lup", "54.37.137.53:5001").then(console.log);

export { TrackInTracklist, TrackList, DJSet, Track, TracklistSearchResult, TrackSearchResult, getTrack, getTracklist, searchTracklists, searchTracks, findAdjacentTracks };