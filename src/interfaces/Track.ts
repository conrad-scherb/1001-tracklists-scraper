import { DJSet } from "./DJSet";

export interface Track {
    title: string;
    artist: string;
    url: string;
    appearances: DJSet[];
}