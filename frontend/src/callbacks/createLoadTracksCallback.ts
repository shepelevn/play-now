import { loadTracks } from '../api/tracks';
import TracksModel from '../model/TracksModel';
import { ModelStatus } from '../types/ModelStatus';
import { ScreenState } from '../types/ScreenState';

export function createLoadTracksCallback(tracksModel: TracksModel): () => void {
  return async () => {
    tracksModel.playlistId = null;
    tracksModel.status = ModelStatus.Pending;
    tracksModel.onChange(ScreenState.Tracks);

    tracksModel.setAll(await loadTracks(tracksModel.filterString));
    tracksModel.status = ModelStatus.Success;

    tracksModel.onChange(ScreenState.Tracks);
  };
}
