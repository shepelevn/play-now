import TrackComponent from '../../components/trackList/TrackComponent';
import PlayerModel from '../../model/PlayerModel';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';

export default class TrackPresenter {
  private readonly trackComponent: TrackComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly trackData: TrackDataWithIndex,
    private readonly playerModel: PlayerModel,
    private readonly likeCallback: () => void,
    private readonly dropdownCallback: (event: Event) => void,
  ) {
    this.trackComponent = new TrackComponent(this.trackData);

    this.render();
  }

  private render(): void {
    this.trackComponent.addOnLikeListener(this.likeCallback);
    this.trackComponent.addOnDropdownListener(this.dropdownCallback);
    this.trackComponent.addOnClickListener(() => {
      this.playerModel.track = this.trackData;
      this.playerModel.onChange();
    });

    this.parentElement.append(this.trackComponent.getElement());
  }
}
