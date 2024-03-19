import HeaderComponent from '../../components/header/HeaderComponent';
import TracksModel from '../../model/TracksModel';
import { notInitialized } from '../../utils/notInitialized';
import ProfilePresenter from './ProfilePresenter';
import SearchPresenter from './SearchPresenter';

export default class HeaderPresenter {
  private readonly headerComponent: HeaderComponent;
  public searchPresenter: SearchPresenter;
  public searchChangeCallback: () => void = notInitialized;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly tracks: TracksModel,
  ) {
    this.headerComponent = new HeaderComponent();

    this.searchPresenter = this.render();
  }

  public render(): SearchPresenter {
    this.headerComponent.removeElement();

    const headerElement = this.headerComponent.getElement();
    this.parentElement.prepend(headerElement);

    this.searchPresenter = new SearchPresenter(
      headerElement,
      this.tracks,
      'header__search',
      'header__search__field',
      'ЧТО БУДЕМ ИСКАТЬ?',
      'desktop-search',
    );

    this.searchPresenter.searchChangeCallback = this.searchChangeCallback;

    new ProfilePresenter(headerElement);

    return this.searchPresenter;
  }
}
