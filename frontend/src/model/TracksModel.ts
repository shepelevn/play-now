import { ModelStatus } from '../types/ModelStatus';
import { ScreenState } from '../types/ScreenState';
import { TrackData } from '../types/TrackData';
import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { TracksType } from '../types/TracksType';
import { generateIndexes } from '../utils/generateIndexes';
import { noop } from '../utils/noop';

export default class TracksModel {
  private tracks: TrackDataWithIndex[] = [];
  public filterString: string = '';
  public status: ModelStatus = ModelStatus.Pending;
  public playlistId: number | null = null;
  public tracksType: TracksType = TracksType.Tracks;
  public tracksTitle: string = 'Треки';
  public onChange: (state: ScreenState) => void = noop;

  public allWithSearch(): TrackDataWithIndex[] {
    return this.tracks.filter((track: TrackData) => {
      const filter: string = this.filterString.toLowerCase();

      return (
        track.name.toLowerCase().includes(filter) ||
        track.artist.name.toLowerCase().includes(filter) ||
        track.album.name.toLowerCase().includes(filter)
      );
    });
  }

  public all(): TrackDataWithIndex[] {
    return this.tracks;
  }

  public setAll(tracks: TrackData[]) {
    this.tracks = tracks.map((track, index) => Object.assign(track, { index }));
  }

  public get(id: number): TrackDataWithIndex {
    return this.findById(id);
  }

  public add(track: TrackData): void {
    const index: number = this.tracks.length;

    this.tracks.push(Object.assign(track, { index }));
  }

  public update(track: TrackData, id: number): void {
    const index = this.tracks.findIndex((track) => track.id === id);

    this.tracks[index] = Object.assign(track, { index });
  }

  public delete(id: number): void {
    this.tracks.filter((track) => track.id !== id);

    this.recalculateIndexes();
  }

  private findById(id: number): TrackDataWithIndex {
    const track = this.tracks.filter((track) => track.id === id)[0];

    if (!track) {
      throw new Error(`Track with id: ${id} not found`);
    }

    return track;
  }

  private recalculateIndexes(): void {
    this.tracks = generateIndexes(this.tracks);
  }
}
