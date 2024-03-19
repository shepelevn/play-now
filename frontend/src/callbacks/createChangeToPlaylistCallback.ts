import TracksModel from '../model/TracksModel';
import SidebarPresenter from '../presenters/sidebar/SidebarPresenter';
import { PlaylistData } from '../types/PlaylistData';
import { ScreenState } from '../types/ScreenState';
import { SidebarButtonType } from '../types/SidebarButtonType';
import { TracksType } from '../types/TracksType';

export function createChangeToPlaylistCallback(
  tracksModel: TracksModel,
  sidebarPresenter: SidebarPresenter,
): (playlistData: PlaylistData) => void {
  return (playlistData: PlaylistData) => {
    tracksModel.tracksTitle = playlistData.name;
    tracksModel.tracksType = TracksType.Playlist;
    tracksModel.playlistId = playlistData.id;
    tracksModel.setAll(playlistData.songs);

    sidebarPresenter.activeButton = SidebarButtonType.Tracks;
    tracksModel.tracksType = TracksType.Playlist;

    sidebarPresenter.render();

    tracksModel.onChange(ScreenState.Tracks);
  };
}
