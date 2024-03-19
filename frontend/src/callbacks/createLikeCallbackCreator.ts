import { USERNAME } from '../api/apiConstants';
import { loadFavorites, postDislike, postLike } from '../api/tracks';
import PlayerModel from '../model/PlayerModel';
import TracksModel from '../model/TracksModel';
import { ModelStatus } from '../types/ModelStatus';
import { ScreenState } from '../types/ScreenState';
import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { TracksType } from '../types/TracksType';
import { isTrackLiked } from '../utils/tracks/isTrackLiked';

export function createLikeCallbackCreator(
  playerModel: PlayerModel,
  tracksModel: TracksModel,
): (trackData: TrackDataWithIndex) => () => void {
  return (trackData: TrackDataWithIndex) => {
    let loading = false;

    return async () => {
      if (loading) {
        return;
      } else {
        loading = true;
      }

      if (!isTrackLiked(trackData)) {
        await postLike(trackData.id);

        trackData.likes.push({ username: USERNAME });
      } else {
        await postDislike(trackData.id);

        trackData.likes = trackData.likes.filter(
          (like) => like.username !== USERNAME,
        );
      }

      playerModel.onTrackInfoChange(trackData);

      if (playerModel.tracksType === TracksType.Favorite) {
        if (isTrackLiked(trackData)) {
          playerModel.originalTracks.push(trackData);
        } else {
          playerModel.originalTracks = playerModel.originalTracks.filter(
            (track) => track.id !== trackData.id,
          );
        }

        playerModel.onTrackListChange();
      }

      if (tracksModel.tracksType === TracksType.Favorite) {
        tracksModel.status = ModelStatus.Pending;

        tracksModel.onUpdate(ScreenState.Tracks);
        tracksModel.setAll(await loadFavorites());

        tracksModel.status = ModelStatus.Success;

        tracksModel.onUpdate(ScreenState.Tracks);
      }

      loading = false;
    };
  };
}
