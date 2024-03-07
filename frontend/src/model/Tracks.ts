import { TrackData } from '../types/TrackData';
import { ModelStatus } from './ModelStatus';
import { TracksType } from './TracksType';

export default class Tracks {
  private tracks: TrackData[] = [];
  public filterString: string = '';
  public status: ModelStatus = ModelStatus.Pending;
  public playlistId: number | null = null;
  public tracksType: TracksType = TracksType.Tracks;

  public allWithSearch(): TrackData[] {
    return this.tracks.filter((track: TrackData) => {
      const filter: string = this.filterString.toLowerCase();

      return (
        track.name.toLowerCase().includes(filter) ||
        track.artist.name.toLowerCase().includes(filter) ||
        track.album.name.toLowerCase().includes(filter)
      );
    });
  }

  public setAll(tracks: TrackData[]) {
    this.tracks = tracks;
  }

  public get(id: number): TrackData {
    return this.findById(id);
  }

  public add(track: TrackData): void {
    this.tracks.push(track);
  }

  public update(track: TrackData, id: number): void {
    const index = this.tracks.findIndex((track) => track.id === id);

    this.tracks[index] = track;
  }

  public delete(id: number): void {
    this.tracks.filter((track) => track.id !== id);
  }

  private findById(id: number): TrackData {
    const track = this.tracks.filter((track) => track.id === id)[0];

    if (!track) {
      throw new Error(`Track with id: ${id} not found`);
    }

    return track;
  }
}
