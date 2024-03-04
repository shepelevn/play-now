import { TrackData } from './TrackData';

export type PlaylistData = {
  name: string;
  imageSrc: string;
  tracksCount: number;
  tracks: TrackData[];
};
