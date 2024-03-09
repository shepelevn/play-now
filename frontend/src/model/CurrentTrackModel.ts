import { TrackData } from '../types/TrackData';
import { noop } from '../utils/noop';

export default class CurrentTrackModel {
  public onChange: () => void = noop;

  constructor(public track: TrackData) {}
}
