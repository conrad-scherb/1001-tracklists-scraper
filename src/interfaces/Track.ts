import { DJSet } from "./DJSet";

export interface Track {
    title: string | null;
    artist: string | null;
    url: string;
    appearances: DJSet[];
    artwork: string | null;
}