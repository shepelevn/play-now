import Component from '../Component';

export default class SearchComponent extends Component {
  public getTemplate(): string {
    return `
      <div class="header__search">
        <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
      </div>
    `;
  }
}
