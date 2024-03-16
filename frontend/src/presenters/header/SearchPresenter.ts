import SearchComponent from '../../components/header/SearchComponent';
import TracksModel from '../../model/TracksModel';
import { notInitialized } from '../../utils/notInitialized';

export default class SearchPresenter {
  private searchComponent: SearchComponent;
  public searchChangeCallback: () => void = notInitialized;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly tracks: TracksModel,
    private readonly className: string,
    private readonly inputClass: string,
    private readonly placeholder: string,
    private readonly inputId: string,
  ) {
    this.searchComponent = this.render();
  }

  public render(): SearchComponent {
    if (this.searchComponent) {
      this.searchComponent.removeElement();
    }

    this.searchComponent = new SearchComponent(
      this.className,
      this.inputClass,
      this.placeholder,
      this.inputId,
    );

    this.parentElement.append(this.searchComponent.getElement());

    this.searchComponent.addOnChange((event: Event) => {
      const input: EventTarget | null = event.currentTarget;

      if (!(input instanceof HTMLInputElement)) {
        throw new Error('Event target is not HTMLInputElement');
      }

      this.tracks.filterString = input.value;

      this.searchChangeCallback();
    });

    return this.searchComponent;
  }
}
