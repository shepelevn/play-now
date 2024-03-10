import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { noop } from '../utils/noop';

export default class PlayerModel {
  public onTrackChange: () => void = noop;
  public onTrackListChange: () => void = noop;
  public tracks: TrackDataWithIndex[];
  public isLoading: boolean = false;

  constructor(
    public track: TrackDataWithIndex,
    public originalTracks: TrackDataWithIndex[],
  ) {
    this.tracks = originalTracks;
  }
}
