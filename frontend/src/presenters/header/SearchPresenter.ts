import SearchComponent from '../../components/header/SearchComponent';

export default class SearchPresenter {
  private searchComponent: SearchComponent;

  constructor(private parentElement: HTMLElement) {
    this.searchComponent = new SearchComponent();

    this.parentElement.append(this.searchComponent.getElement());
  }
}
