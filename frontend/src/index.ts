import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { createRootElement } from './createRootElement';
import HeaderPresenter from './presenters/header/HeaderPresenter';
import SidebarPresenter from './presenters/sidebar/SidebarPresenter';
import TrackListPresenter from './presenters/tracklist/TrackListPresenter';
import PlayerPresenter from './presenters/player/PlayerPresenter';
import { createAndAppendElement } from './utils/createAndAppendElement';
import DropdownService from './utils/DropdownService';

import './resources/css/style.css';

TimeAgo.addDefaultLocale(ru);

const dropdownService = new DropdownService();

// TODO: Move to main presenter maybe
const rootElement: HTMLElement = createRootElement();

new HeaderPresenter(rootElement);

const contentWrapElement: HTMLElement = createAndAppendElement(
  rootElement,
  '<div class="content-wrap flex"></div>',
);

new SidebarPresenter(contentWrapElement);

const mainElement = createAndAppendElement(
  contentWrapElement,
  '<main class="main"> </main>',
);

new TrackListPresenter(mainElement, dropdownService);

new PlayerPresenter(rootElement);
