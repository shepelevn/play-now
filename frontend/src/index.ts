import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { createRootElement } from './createRootElement';
import HeaderPresenter from './presenters/HeaderPresenter';
import SidebarPresenter from './presenters/SidebarPresenter';
import TrackListPresenter from './presenters/TrackListPresenter';
import PlayerPresenter from './presenters/PlayerPresenter';

import './resources/css/style.css';
import { createAndAppendElement } from './utils/createAndAppendElement';

TimeAgo.addDefaultLocale(ru);

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

new TrackListPresenter(mainElement);

new PlayerPresenter(rootElement);
