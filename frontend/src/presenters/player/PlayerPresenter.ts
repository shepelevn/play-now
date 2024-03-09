import PlayerComponent from '../../components/player/PlayerComponent';
import TracksModel from '../../model/TracksModel';
import { TrackData } from '../../types/TrackData';

export default class PlayerPresenter {
  private readonly playerComponent: PlayerComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    tracksModel: TracksModel,
  ) {
    let trackData: TrackData | undefined = tracksModel.allWithSearch()[0];

    if (!trackData) {
      // TODO: Turn on error later
      // throw new Error('First track not found');
      trackData = {
        id: 0,
        path: '',
        image: '',
        name: 'test',
        createdAt: '2024-02-28 11:14:19',
        duration: 120000,
        album: {
          name: 'test',
          image: '',
        },
        artist: {
          name: 'test',
        },
        likes: [
          {
            username: 'test',
          },
        ],
      };
    }

    this.playerComponent = new PlayerComponent(trackData);

    this.parentElement.append(this.playerComponent.getElement());
  }
}
