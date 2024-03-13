import { TrackData } from '../../types/TrackData';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';

export function generateIndexes(tracks: TrackData[]): TrackDataWithIndex[] {
  return tracks.map((track, index) => {
    const indexedTrack: TrackDataWithIndex = Object.assign(track, { index });
    return indexedTrack;
  });
}
