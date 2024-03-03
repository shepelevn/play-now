import { TrackData } from '../types/TrackData';

export default class Tracks {
  public filterString: string = '';

  constructor(private tracks: TrackData[]) {
    this.generateIds();
  }

  public all(): TrackData[] {
    return this.tracks.filter((track: TrackData) => {
      return (
        track.title.includes(this.filterString) ||
        track.author.includes(this.filterString) ||
        track.album.includes(this.filterString)
      );
    });
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
