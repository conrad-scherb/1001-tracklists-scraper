import { TrackInTracklist } from './TrackInTracklist';

export interface TrackList {
    tracks: TrackInTracklist[];
    name: string;
    url: string;
}