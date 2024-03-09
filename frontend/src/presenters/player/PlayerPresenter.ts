import { SERVER_URL } from '../../api/apiConstants';
import PlayerComponent from '../../components/player/PlayerComponent';
import PlayerModel from '../../model/PlayerModel';
import noUiSlider from 'nouislider';

export default class PlayerPresenter {
  private readonly playerComponent: PlayerComponent;
  private readonly audioElement: HTMLAudioElement;
  private readonly audioContext: AudioContext;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playerModel: PlayerModel,
  ) {
    this.playerComponent = new PlayerComponent(this.playerModel.track);

    this.render();

    this.createTrackSlider();
    this.createVolumeSlider();

    this.audioContext = new AudioContext();
    this.audioElement = this.load();
    this.play();
  }

  public render(): void {
    this.parentElement.append(this.playerComponent.getElement());
  }

  public load(): HTMLAudioElement {
    const audioElement: HTMLAudioElement = new Audio(
      `${SERVER_URL}${this.playerModel.track.path}`,
    );

    audioElement.crossOrigin = 'anonymous';

    const audioSource: MediaElementAudioSourceNode =
      this.audioContext.createMediaElementSource(audioElement);

    audioSource.connect(this.audioContext.destination);

    return audioElement;
  }

  private play(): void {
    this.audioElement.play();
  }

  private createTrackSlider(): void {
    const slider: HTMLElement | null = document.getElementById('range-play');

    if (!slider) {
      throw new Error('Element with id: "range-play" is not found');
    }

    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 120,
      },
      step: 1,
      start: [60],

      connect: 'lower',

      behaviour: 'tap-drag',
    });
  }

  private createVolumeSlider(): void {
    const slider: HTMLElement | null = document.getElementById('range-volume');

    if (!slider) {
      throw new Error('Element with id: "range-play" is not found');
    }

    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: [60],

      connect: 'lower',

      behaviour: 'tap-drag',
    });
  }
}
