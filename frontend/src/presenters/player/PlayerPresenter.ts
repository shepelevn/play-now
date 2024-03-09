import PlayerComponent from '../../components/player/PlayerComponent';
import PlayerModel from '../../model/PlayerModel';

export default class PlayerPresenter {
  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playerModel: PlayerModel,
  ) {
    this.render();
  }

  public render(): void {
    this.parentElement.append(
      new PlayerComponent(this.playerModel.track).getElement(),
    );
  }
}
