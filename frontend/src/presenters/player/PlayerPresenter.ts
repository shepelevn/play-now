import PlayerComponent from '../../components/player/PlayerComponent';
import CurrentTrackModel from '../../model/CurrentTrackModel';

export default class PlayerPresenter {
  private readonly playerComponent: PlayerComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    currentTrackModel: CurrentTrackModel,
  ) {
    this.playerComponent = new PlayerComponent(currentTrackModel.track);

    this.parentElement.append(this.playerComponent.getElement());
  }
}
