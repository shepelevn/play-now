export type TrackData = {
  id: number;
  path: string;
  image: string;
  name: string;
  createdAt: string;
  duration: number;
  album: {
    name: string;
    image: string;
  };
  artist: {
    name: string;
  };
  likes: {
    username: string;
  }[];
};

export type ShortTrackData = {
  id: number;
  path: string;
  image: string;
  name: string;
  createdAt: string;
  duration: number;
};
