import TrackComponent from '../../components/trackList/TrackComponent';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';

export default class TrackPresenter {
  private readonly trackComponent: TrackComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly trackData: TrackDataWithIndex,
    private readonly likeCallback: () => void,
    private readonly dropdownCallback: (event: Event) => void,
  ) {
    this.trackComponent = new TrackComponent(this.trackData);

    this.render();
  }

  private render(): void {
    this.trackComponent.addOnLikeListener(this.likeCallback);
    this.trackComponent.addOnDropdownListener(this.dropdownCallback);

    this.parentElement.append(this.trackComponent.getElement());
  }
}
