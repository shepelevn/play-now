import { SERVER_URL } from '../../api/apiConstants';
import PlayerComponent from '../../components/player/PlayerComponent';
import PlayerModel from '../../model/PlayerModel';
import noUiSlider, { API } from 'nouislider';
import { PlayerStatus } from '../../types/PlayerStatus';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';
import { shuffleArray } from '../../utils/shuffleArray';
import { generateIndexes } from '../../utils/generateIndexes';
import { getTimeString } from '../../utils/getTimeString';
import TracksModel from '../../model/TracksModel';
import {ToastType, showToast} from '../../utils/showToast';

export default class PlayerPresenter {
  private playerComponent: PlayerComponent;
  private audioElement: HTMLAudioElement;
  private audioContext: AudioContext;
  private status: PlayerStatus = PlayerStatus.Stopped;
  private volume: number = 0.5;
  private shuffle: boolean = false;
  private repeat: boolean = false;
  private trackSlider: API | null = null;
  private tracksChanged: number = 0;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playerModel: PlayerModel,
    private readonly tracksModel: TracksModel,
  ) {
    // Left here so there would be no TypeScript initialization error
    this.playerComponent = new PlayerComponent(
      this.playerModel.track,
      this.status,
      this.shuffle,
      this.repeat,
      this.playerModel.isLoading,
    );

    this.audioContext = new AudioContext();

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.audioElement = new Audio();
    this.load();

    this.render();
  }

  public render(): void {
    this.playerComponent.removeElement();

    this.playerComponent = new PlayerComponent(
      this.playerModel.track,
      this.status,
      this.shuffle,
      this.repeat,
      this.playerModel.isLoading,
    );

    this.parentElement.append(this.playerComponent.getElement());

    this.addHandlers();

    this.createTrackSlider(this.playerModel.track.duration);
    this.createVolumeSlider();
  }

  private addHandlers(): void {
    this.playerComponent.addOnPlayListener(() => {
      this.play();
    });

    this.playerComponent.addOnStopListener(() => {
      this.pause();
    });

    this.playerComponent.addOnNextListener(() => {
      this.loadNextTrack();
    });

    this.playerComponent.addOnPreviousListener(() => {
      this.loadPreviousTrack();
    });

    this.playerComponent.addOnShuffleListener(() => {
      this.shuffle = !this.shuffle;

      this.onTrackListChange();
    });

    this.playerComponent.addOnRepeatListener(() => {
      this.repeat = !this.repeat;

      this.render();
    });
  }

  public onTrackListChange(): void {
    this.playerModel.tracksType = this.tracksModel.tracksType;
    this.playerModel.playlistId = this.tracksModel.playlistId;

    if (this.shuffle) {
      const playerNextTracks: TrackDataWithIndex[] = shuffleArray(
        this.playerModel.originalTracks.filter(
          (track) => track.id !== this.playerModel.track.id,
        ),
      );

      this.playerModel.track.index = 0;
      playerNextTracks.unshift(this.playerModel.track);

      this.playerModel.tracks = generateIndexes(playerNextTracks);
    } else {
      this.playerModel.tracks = generateIndexes(
        this.playerModel.originalTracks,
      );

      // TODO: Delete code later
      // const currentTrack: TrackDataWithIndex | undefined =
      //   this.playerModel.tracks.filter(
      //     (track) => track.id === this.playerModel.track.id,
      //   )[0];

      // if (!currentTrack) {
      //   throw new Error(
      //     `Track with id: ${this.playerModel.track.id} is not found`,
      //   );
    }

    // this.playerModel.track = currentTrack;
  }

  public load(): void {
    this.audioElement.pause();
    this.audioElement.remove();
    this.audioElement = this.loadElement();

    this.audioElement.volume = this.volume;

    this.trackSlider?.set(0);

    this.audioElement.addEventListener('loadeddata', () => {
      this.audioElement.addEventListener('timeupdate', () => {
        const currentTime = this.audioElement.currentTime;
        this.trackSlider?.set(currentTime);

        const timeElement: HTMLElement | null =
          document.getElementById('player-time');

        if (!timeElement) {
          throw new Error('Element with id: player-time is not found');
        }

        timeElement.innerText = getTimeString(currentTime * 1000);
      });

      this.audioElement.addEventListener('ended', () => {
        this.loadNextTrack();
      });
    });
  }

  private loadElement(): HTMLAudioElement {
    const audioElement: HTMLAudioElement = new Audio(
      `${SERVER_URL}${this.playerModel.track.path}`,
    );

    audioElement.crossOrigin = 'anonymous';

    const audioSource: MediaElementAudioSourceNode =
      this.audioContext.createMediaElementSource(audioElement);

    audioSource.connect(this.audioContext.destination);

    return audioElement;
  }

  public async play(): Promise<void> {
    this.playerModel.isLoading = true;
    let isTimeout = false;
    try {
      const loadTimeoutId = setTimeout(() => {
        showToast(ToastType.Danger, '', 'Не удалось загрузить трек.');

        this.playerModel.isLoading = false;
        isTimeout = true;

        this.audioElement.pause();
        this.audioElement.remove();

        this.audioContext.close();
        this.audioContext = new AudioContext();

        this.render();
      }, 10_000);

      this.render();

      await this.audioElement.play();

      clearTimeout(loadTimeoutId);

      if (isTimeout) {
        this.audioElement.pause();
        return;
      }

      this.status = PlayerStatus.Playing;
      this.render();
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
    } finally {
      // Remove isLoading flag with delay to prevent fast clicking on tracks
      if (this.tracksChanged === 2) {
        setTimeout(() => {
          this.playerModel.isLoading = false;
          this.render();
        }, 3000);
      } else {
        this.tracksChanged++;

        setTimeout(() => {
          this.playerModel.isLoading = false;
          this.render();
        }, 1000);

        setTimeout(() => {
          this.tracksChanged = 0;
        }, 12_000);
      }
    }
  }

  public pause(): void {
    this.audioElement.pause();

    this.status = PlayerStatus.Stopped;
    this.render();
  }

  private loadNextTrack(): void {
    if (this.playerModel.isLoading) {
      return;
    }

    if (
      !this.playerModel.tracks.filter(
        (track) => track.id === this.playerModel.track.id,
      )[0]
    ) {
      const firstTrack: TrackDataWithIndex | undefined =
        this.playerModel.tracks[0];

      if (!firstTrack) {
        return;
      }

      this.playerModel.track = firstTrack;
    } else {
      const currentIndex: number = this.playerModel.track.index;
      const nextIndex: number =
        (currentIndex + 1) % this.playerModel.tracks.length;

      const nextTrack: TrackDataWithIndex | undefined =
        this.playerModel.tracks[nextIndex];

      if (!nextTrack) {
        throw new Error('Next track is undefined');
      }

      this.playerModel.track = nextTrack;
    }

    this.playerModel.onTrackChange();
  }

  private loadPreviousTrack(): void {
    if (this.playerModel.isLoading) {
      return;
    }

    if (
      !this.playerModel.tracks.filter(
        (track) => track.id === this.playerModel.track.id,
      )[0]
    ) {
      const firstTrack: TrackDataWithIndex | undefined =
        this.playerModel.tracks[0];

      if (!firstTrack) {
        return;
      }

      this.playerModel.track = firstTrack;
    } else {
      const currentIndex: number = this.playerModel.track.index;
      const tracksLength: number = this.playerModel.tracks.length;
      const previousIndex: number =
        (currentIndex - 1 + tracksLength) % tracksLength;

      const previousTrack: TrackDataWithIndex | undefined =
        this.playerModel.tracks[previousIndex];

      if (!previousTrack) {
        throw new Error('Previous track is undefined');
      }

      this.playerModel.track = previousTrack;
    }

    this.playerModel.onTrackChange();
  }

  private createTrackSlider(trackDuration: number): void {
    const slider: HTMLElement | null = document.getElementById('range-play');

    if (!slider) {
      throw new Error('Element with id: "range-play" is not found');
    }

    const trackSlider = noUiSlider.create(slider, {
      range: {
        min: 0,
        max: trackDuration / 1000,
      },
      step: 1,
      start: [this.audioElement.currentTime],

      connect: 'lower',

      behaviour: 'tap-drag',
    });

    this.trackSlider = trackSlider;

    trackSlider.on('change', () => {
      let value: number = Number(trackSlider.get());

      if (value < 3) {
        value = 0;
      }

      this.audioElement.currentTime = value;
    });
  }

  private createVolumeSlider(): void {
    const sliderElement: HTMLElement | null =
      document.getElementById('range-volume');

    if (!sliderElement) {
      throw new Error('Element with id: "range-play" is not found');
    }

    const slider: API = noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: [this.volume * 100],

      connect: 'lower',

      behaviour: 'tap-drag',
    });

    slider.on('update', () => {
      const value: number = Number(slider.get());

      const newVolume = value / 100;
      this.volume = newVolume;

      this.audioElement.volume = newVolume;
    });
  }
}
