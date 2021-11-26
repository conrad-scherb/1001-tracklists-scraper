
export interface Track {
    fullTrackName: string;
    artist: string;
    trackName: string;
    albumArt: string | undefined;
    url: string | undefined;
    nextURL: string | undefined;
    prevURL: string | undefined;
}