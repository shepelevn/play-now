import SearchComponent from '../../components/header/SearchComponent';
import Tracks from '../../model/Tracks';
import { noop } from '../../utils/noop';

export default class SearchPresenter {
  private searchComponent: SearchComponent;
  public searchChangeCallback: () => void = noop;

  constructor(
    private parentElement: HTMLElement,
    tracks: Tracks,
  ) {
    this.searchComponent = new SearchComponent();

    this.parentElement.append(this.searchComponent.getElement());

    this.searchComponent.addOnChange((event: Event) => {
      const input: EventTarget | null = event.currentTarget;

      if (!(input instanceof HTMLInputElement)) {
        throw new Error('Event target is not HTMLInputElement');
      }

      tracks.filterString = input.value;

      this.searchChangeCallback();
    });
  }
}
