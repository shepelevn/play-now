import { TrackData } from '../types/TrackData';
import { ModelStatus } from './ModelStatus';

export default class Tracks {
  private tracks: TrackData[] = [];
  public filterString: string = '';
  public status: ModelStatus = ModelStatus.Pending;
  public playlistId: number | null = null;

  public allWithSearch(): TrackData[] {
    return this.tracks.filter((track: TrackData) => {
      return (
        track.name.includes(this.filterString) ||
        track.artist.name.includes(this.filterString) ||
        track.album.name.includes(this.filterString)
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
