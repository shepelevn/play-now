import playlistSmallImage1 from '../../resources/img/playlists__360 (1).jpg';
import playlistSmallImage2 from '../../resources/img/playlists__360 (2).jpg';
import playlistSmallImage3 from '../../resources/img/playlists__360 (3).jpg';
import playlistSmallImage4 from '../../resources/img/playlists__360 (4).jpg';
import playlistSmallImage5 from '../../resources/img/playlists__360 (5).jpg';
import playlistSmallImage6 from '../../resources/img/playlists__360 (6).jpg';
import playlistSmallImage7 from '../../resources/img/playlists__360 (7).jpg';
import playlistSmallImage8 from '../../resources/img/playlists__360 (8).jpg';

import playlistImage1 from '../../resources/img/playlists (1).jpg';
import playlistImage2 from '../../resources/img/playlists (2).jpg';
import playlistImage3 from '../../resources/img/playlists (3).jpg';
import playlistImage4 from '../../resources/img/playlists (4).jpg';
import playlistImage5 from '../../resources/img/playlists (5).jpg';
import playlistImage6 from '../../resources/img/playlists (6).jpg';
import playlistImage7 from '../../resources/img/playlists (7).jpg';
import playlistImage8 from '../../resources/img/playlists (8).jpg';

import playlistBigImage1 from '../../resources/img/playlists__1440 (1).jpg';
import playlistBigImage2 from '../../resources/img/playlists__1440 (2).jpg';
import playlistBigImage3 from '../../resources/img/playlists__1440 (3).jpg';
import playlistBigImage4 from '../../resources/img/playlists__1440 (4).jpg';
import playlistBigImage5 from '../../resources/img/playlists__1440 (5).jpg';
import playlistBigImage6 from '../../resources/img/playlists__1440 (6).jpg';
import playlistBigImage7 from '../../resources/img/playlists__1440 (7).jpg';
import playlistBigImage8 from '../../resources/img/playlists__1440 (8).jpg';

type PlaylistImagesConstant = {
  small: string[];
  normal: string[];
  big: string[];
};

const SMALL_IMAGES: string[] = [
  playlistSmallImage1,
  playlistSmallImage2,
  playlistSmallImage3,
  playlistSmallImage4,
  playlistSmallImage5,
  playlistSmallImage6,
  playlistSmallImage7,
  playlistSmallImage8,
];

const NORMAL_IMAGES: string[] = [
  playlistImage1,
  playlistImage2,
  playlistImage3,
  playlistImage4,
  playlistImage5,
  playlistImage6,
  playlistImage7,
  playlistImage8,
];

const BIG_IMAGES: string[] = [
  playlistBigImage1,
  playlistBigImage2,
  playlistBigImage3,
  playlistBigImage4,
  playlistBigImage5,
  playlistBigImage6,
  playlistBigImage7,
  playlistBigImage8,
];

export const PLAYLIST_IMAGES: PlaylistImagesConstant = {
  small: SMALL_IMAGES,
  normal: NORMAL_IMAGES,
  big: BIG_IMAGES,
};
