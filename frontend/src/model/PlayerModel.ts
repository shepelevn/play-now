import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { TracksType } from '../types/TracksType';
import { noop } from '../utils/noop';

export default class PlayerModel {
  public onTrackChange: () => void = noop;
  public onTrackListChange: () => void = noop;
  public tracks: TrackDataWithIndex[];
  public isLoading: boolean = false;

  public tracksType: TracksType = TracksType.Tracks;
  public playlistId: number | null = null;

  constructor(
    public track: TrackDataWithIndex,
    public originalTracks: TrackDataWithIndex[],
  ) {
    this.tracks = originalTracks;
  }
}
