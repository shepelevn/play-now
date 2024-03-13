import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { TracksType } from '../types/TracksType';
import { notInitialized } from '../utils/notInitialized';

export default class PlayerModel {
  public onTrackInfoChange: (trackData: TrackDataWithIndex) => void =
    notInitialized;
  public onTrackChange: () => void = notInitialized;
  public onTrackListChange: () => void = notInitialized;
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
