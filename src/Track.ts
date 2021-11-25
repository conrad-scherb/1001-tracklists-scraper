
export interface Track {
    fullTrackName: string;
    artist: string;
    trackName: string;
    url: string | undefined;
    nextURL: string | undefined;
    prevURL: string | undefined;
}