import { TrackData } from '../types/TrackData';
import { ModelStatus } from './ModelStatus';

export default class Tracks {
  private tracks: TrackData[] = [];
  public filterString: string = '';
  public status: ModelStatus = ModelStatus.Pending;

  constructor() {
    // TODO: See if it works after change
    this.generateIds();
  }

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

  public get(id: number): TrackData | undefined {
    return this.tracks[id];
  }

  public add(track: TrackData): void {
    this.tracks.push(track);
  }

  public update(track: TrackData, id: number): void {
    this.tracks[id] = track;
  }

  public delete(id: number): void {
    this.tracks = this.tracks.slice(0, id).concat(this.tracks.slice(id + 1));
    this.generateIds();
  }

  private generateIds(): void {
    for (let i = 0; i < this.tracks.length; i++) {
      const track: TrackData | undefined = this.tracks[i];

      if (track) {
        track.id = i;

        this.tracks[i] = track;
      }
    }
  }
}
