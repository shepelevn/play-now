import { USERNAME } from '../api/apiConstants';
import { postDislike, postLike } from '../api/tracks';
import PlayerModel from '../model/PlayerModel';
import { TrackDataWithIndex } from '../types/TracksDataWithIndex';
import { isTrackLiked } from '../utils/tracks/isTrackLiked';

export function createLikeCallbackCreator(
  playerModel: PlayerModel,
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

      loading = false;
    };
  };
}
