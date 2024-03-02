import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { mainRender } from './render/mainRender';

import './resources/css/style.css';

TimeAgo.addDefaultLocale(ru);

mainRender();
