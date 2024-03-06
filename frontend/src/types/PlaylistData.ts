import { TrackData } from './TrackData';

export type PlaylistData = {
  id: number;
  name: string;
  imageId: number;
  songs: TrackData[];
};
