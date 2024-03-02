import { renderContentWrap } from '../render/renderContentWrap';
import { renderMain } from '../render/renderMain';
import Component from './Component';
import HeaderComponent from './header/HeaderComponent';
import PlayerComponent from './player/PlayerComponent';
import SidebarComponent from './sidebar/SidebarComponent';
import TrackListComponent from './trackList/TrackListComponent';

export default class RootComponent extends Component {
  public getTemplate(): string {
    return `
      ${new HeaderComponent().getTemplate()}
      ${renderContentWrap(new SidebarComponent(), renderMain(new TrackListComponent()))}
      ${new PlayerComponent().getTemplate()}
    `;
  }
}
