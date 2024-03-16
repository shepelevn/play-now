import { loadTracks } from '../api/tracks';
import TracksModel from '../model/TracksModel';
import { ModelStatus } from '../types/ModelStatus';
import { ScreenState } from '../types/ScreenState';

export function createLoadTracksCallback(tracksModel: TracksModel): () => void {
  let timeout: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      tracksModel.playlistId = null;
      tracksModel.status = ModelStatus.Pending;
      tracksModel.onUpdate(ScreenState.Tracks);

      tracksModel.setAll(await loadTracks(tracksModel.filterString));
      tracksModel.status = ModelStatus.Success;

      tracksModel.onUpdate(ScreenState.Tracks);
    }, 500);
  };
}
