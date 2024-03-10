import { PlayerStatus } from '../../types/PlayerStatus';
import { TrackData } from '../../types/TrackData';
import { getTimeString } from '../../utils/getTimeString';
import Component from '../Component';
import { renderSvgSprite } from '../../render/renderSvgSprite';

import playSprite from '../../resources/svg/player-play.sprite.svg';
import stopSprite from '../../resources/svg/stop.sprite.svg';

export default class PlayerComponent extends Component {
  constructor(
    private readonly trackData: TrackData,
    public status: PlayerStatus,
  ) {
    super();
  }

  public getTemplate(): string {
    const centerButtonTemplate: string = this.getCenterButtonTemplate(
      this.status,
    );

    return `
      <footer class="footer">
        <div class="player flex">
          <div class="player__track-name flex"><img class="player__track__img" src="${this.trackData.image}" alt="${this.trackData.name} - ${this.trackData.artist.name}">
            <div class="player__track-name__content">
              <div class="flex player__name__header">
                <h3 class="player__track__h3">${this.trackData.name}</h3>
                <button class="player__track__like">
                   <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"/>
      </svg>
                </button>
              </div>
              <p class="player__track__author">${this.trackData.artist.name}</p>
            </div>
          </div>
          <div class="player__controls">
            <div class="player__controls__header">
              <button class="player__shaffle-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9946 11.4307C14.9933 11.4211 14.9922 11.4116 14.9903 11.4021C14.9887 11.3943 14.9866 11.3867 14.9846 11.379C14.9826 11.3709 14.9808 11.3627 14.9784 11.3546C14.9761 11.3471 14.9732 11.3398 14.9706 11.3324C14.9678 11.3244 14.9651 11.3163 14.9618 11.3084C14.959 11.3017 14.9557 11.2952 14.9526 11.2886C14.9488 11.2804 14.9451 11.2721 14.9408 11.264C14.9375 11.258 14.9338 11.2522 14.9303 11.2463C14.9255 11.2382 14.9209 11.23 14.9156 11.2221C14.9114 11.2159 14.9068 11.2101 14.9024 11.2041C14.8972 11.197 14.8921 11.1897 14.8864 11.1828C14.8792 11.174 14.8713 11.1657 14.8635 11.1574C14.8601 11.1538 14.8571 11.1499 14.8536 11.1464L13.3536 9.64642C13.3071 9.59999 13.252 9.56316 13.1914 9.53803C13.1307 9.5129 13.0657 9.49997 13 9.49997C12.9343 9.49997 12.8693 9.5129 12.8086 9.53803C12.748 9.56316 12.6929 9.59999 12.6464 9.64642C12.6 9.69285 12.5632 9.74798 12.538 9.80865C12.5129 9.86931 12.5 9.93433 12.5 10C12.5 10.0657 12.5129 10.1307 12.538 10.1914C12.5632 10.252 12.6 10.3071 12.6464 10.3536L13.2929 11H12.5585C12.0015 10.9994 11.4526 10.8662 10.9573 10.6113C10.462 10.3565 10.0346 9.98729 9.71039 9.53436L7.10333 5.88446C6.68649 5.30212 6.13693 4.82744 5.50015 4.49974C4.86337 4.17203 4.15769 4.00072 3.44153 4H2C1.86739 4 1.74021 4.05268 1.64645 4.14645C1.55268 4.24021 1.5 4.36739 1.5 4.5C1.5 4.63261 1.55268 4.75979 1.64645 4.85355C1.74021 4.94732 1.86739 5 2 5H3.44153C3.99854 5.00056 4.5474 5.13379 5.04268 5.38866C5.53795 5.64353 5.96539 6.01271 6.28961 6.46564L8.89667 10.1155C9.31351 10.6979 9.86307 11.1726 10.4999 11.5003C11.1366 11.828 11.8423 11.9993 12.5585 12H13.2929L12.6464 12.6464C12.5526 12.7402 12.5 12.8674 12.5 13C12.5 13.1326 12.5526 13.2598 12.6464 13.3536C12.7402 13.4474 12.8674 13.5 13 13.5C13.1326 13.5 13.2598 13.4474 13.3536 13.3536L14.8536 11.8536C14.8571 11.8501 14.8601 11.8462 14.8635 11.8426C14.8713 11.8343 14.8792 11.826 14.8864 11.8172C14.8921 11.8103 14.8972 11.803 14.9024 11.7959C14.9068 11.7899 14.9114 11.7841 14.9156 11.7779C14.9209 11.77 14.9255 11.7618 14.9303 11.7537C14.9338 11.7478 14.9375 11.742 14.9408 11.736C14.9451 11.7279 14.9488 11.7196 14.9526 11.7114C14.9557 11.7048 14.959 11.6983 14.9618 11.6916C14.9651 11.6837 14.9678 11.6756 14.9706 11.6676C14.9732 11.6602 14.9761 11.6529 14.9784 11.6454C14.9808 11.6373 14.9826 11.6291 14.9846 11.621C14.9866 11.6133 14.9887 11.6057 14.9903 11.5979C14.9922 11.5884 14.9933 11.5789 14.9946 11.5693C14.9955 11.5627 14.9968 11.5562 14.9975 11.5495C15.0008 11.5166 15.0008 11.4834 14.9975 11.4505C14.9968 11.4438 14.9955 11.4373 14.9946 11.4307Z" fill="#AAAAAA"/>
      <path d="M8.93836 6.68632C8.99178 6.7245 9.0522 6.75179 9.11617 6.76661C9.18014 6.78144 9.24641 6.78351 9.31118 6.77271C9.37595 6.76191 9.43796 6.73846 9.49366 6.70368C9.54936 6.66891 9.59766 6.6235 9.63581 6.57004L9.71039 6.46561C10.0346 6.01269 10.4621 5.64351 10.9573 5.38863C11.4526 5.13376 12.0015 5.00053 12.5585 4.99997H13.2929L12.6464 5.6464C12.5527 5.74017 12.5 5.86736 12.5 5.99997C12.5 6.13259 12.5527 6.25978 12.6464 6.35355C12.7402 6.44733 12.8674 6.50001 13 6.50001C13.1326 6.50001 13.2598 6.44733 13.3536 6.35355L14.8536 4.85355C14.8571 4.85003 14.8601 4.84618 14.8635 4.84258C14.8713 4.83428 14.8792 4.82599 14.8864 4.81717C14.8922 4.81025 14.8972 4.80298 14.9024 4.79583C14.9068 4.78985 14.9114 4.78408 14.9156 4.7779C14.9209 4.76999 14.9255 4.76179 14.9303 4.75364C14.9338 4.74775 14.9375 4.74201 14.9408 4.73595C14.9451 4.72788 14.9488 4.71957 14.9526 4.71134C14.9557 4.70475 14.959 4.69829 14.9618 4.69155C14.9651 4.68364 14.9678 4.67557 14.9706 4.66753C14.9732 4.66014 14.9761 4.65287 14.9784 4.64533C14.9808 4.63727 14.9826 4.62909 14.9847 4.62094C14.9866 4.61325 14.9887 4.60569 14.9903 4.59786C14.9922 4.5884 14.9933 4.57883 14.9946 4.56929C14.9955 4.56267 14.9968 4.55617 14.9975 4.54947C15.0008 4.51655 15.0008 4.48339 14.9975 4.45047C14.9968 4.44377 14.9955 4.43727 14.9946 4.43065C14.9933 4.42112 14.9922 4.41155 14.9903 4.40209C14.9887 4.39426 14.9866 4.38669 14.9847 4.379C14.9826 4.37085 14.9808 4.36268 14.9784 4.35462C14.9761 4.34708 14.9732 4.3398 14.9706 4.33242C14.9678 4.32438 14.9651 4.3163 14.9618 4.3084C14.959 4.30166 14.9557 4.2952 14.9526 4.28861C14.9488 4.28037 14.9451 4.27207 14.9408 4.264C14.9375 4.25794 14.9338 4.2522 14.9303 4.24631C14.9255 4.23816 14.9209 4.22995 14.9156 4.22205C14.9114 4.21587 14.9068 4.2101 14.9024 4.20412C14.8972 4.19696 14.8922 4.1897 14.8864 4.18277C14.8792 4.17395 14.8713 4.16567 14.8635 4.15737C14.8601 4.15377 14.8571 4.14992 14.8536 4.1464L13.3536 2.6464C13.2598 2.55262 13.1326 2.49994 13 2.49994C12.8674 2.49994 12.7402 2.55262 12.6464 2.6464C12.5527 2.74017 12.5 2.86736 12.5 2.99997C12.5 3.13259 12.5527 3.25977 12.6464 3.35355L13.2929 3.99997H12.5585C11.8423 4.0007 11.1366 4.17201 10.4999 4.49971C9.86307 4.82741 9.31351 5.30209 8.89667 5.88444L8.82209 5.98887C8.78392 6.04229 8.75665 6.10272 8.74183 6.16668C8.72702 6.23065 8.72495 6.29691 8.73575 6.36168C8.74655 6.42644 8.77 6.48845 8.80476 6.54415C8.83952 6.59985 8.88492 6.64816 8.93836 6.68632Z" fill="#AAAAAA"/>
      <path d="M7.06165 9.31365C7.00822 9.27547 6.9478 9.24818 6.88383 9.23336C6.81986 9.21854 6.7536 9.21646 6.68883 9.22726C6.62405 9.23806 6.56205 9.26152 6.50634 9.29629C6.45064 9.33107 6.40234 9.37648 6.3642 9.42993L6.28961 9.53436C5.96539 9.98728 5.53795 10.3565 5.04268 10.6113C4.5474 10.8662 3.99854 10.9994 3.44153 11H2C1.86739 11 1.74021 11.0527 1.64645 11.1464C1.55268 11.2402 1.5 11.3674 1.5 11.5C1.5 11.6326 1.55268 11.7598 1.64645 11.8535C1.74021 11.9473 1.86739 12 2 12H3.44153C4.15769 11.9993 4.86337 11.828 5.50015 11.5003C6.13693 11.1726 6.68649 10.6979 7.10333 10.1155L7.17792 10.0111C7.21609 9.95768 7.24336 9.89725 7.25817 9.83329C7.27298 9.76932 7.27505 9.70306 7.26425 9.63829C7.25346 9.57353 7.23001 9.51152 7.19524 9.45582C7.16048 9.40012 7.11508 9.35181 7.06165 9.31365Z" fill="#AAAAAA"/>
      </svg>
              </button>
              <button class="player__skipback-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 2C3.63261 2 3.75978 2.05268 3.85355 2.14645C3.94732 2.24022 4 2.36739 4 2.5V7.10846L11.4786 2.53821C11.6302 2.44558 11.8037 2.39501 11.9813 2.39169C12.1589 2.38838 12.3342 2.43244 12.4892 2.51934C12.6441 2.60624 12.7731 2.73285 12.8629 2.88615C12.9527 3.03944 13 3.21389 13 3.39154V12.6085C12.9999 12.7861 12.9526 12.9605 12.8628 13.1137C12.773 13.267 12.644 13.3936 12.489 13.4805C12.3341 13.5674 12.1588 13.6114 11.9812 13.6081C11.8036 13.6048 11.6301 13.5543 11.4785 13.4618L4 8.89151V13.5C4 13.6326 3.94732 13.7598 3.85355 13.8536C3.75979 13.9473 3.63261 14 3.5 14C3.36739 14 3.24021 13.9473 3.14645 13.8536C3.05268 13.7598 3 13.6326 3 13.5V2.5C3 2.36739 3.05268 2.24022 3.14645 2.14645C3.24022 2.05268 3.36739 2 3.5 2Z" fill="#AAAAAA"/>
      </svg>
              </button>
              ${centerButtonTemplate}
              <button class="player__skipnext-btn"><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0.5V11.5C10 11.6326 9.94732 11.7598 9.85355 11.8536C9.75979 11.9473 9.63261 12 9.5 12C9.36739 12 9.24021 11.9473 9.14645 11.8536C9.05268 11.7598 9 11.6326 9 11.5V6.89151L1.52148 11.4618C1.36989 11.5544 1.19636 11.605 1.01873 11.6083C0.841109 11.6116 0.665804 11.5676 0.510852 11.4807C0.355901 11.3938 0.226897 11.2672 0.137111 11.1139C0.0473251 10.9606 -1.32783e-06 10.7861 0 10.6085V1.39154C-2.12292e-06 1.21389 0.0473207 1.03944 0.137101 0.886149C0.226881 0.732854 0.355877 0.606243 0.51082 0.519338C0.665764 0.432434 0.841061 0.388374 1.01868 0.39169C1.1963 0.395007 1.36983 0.44558 1.52142 0.538208L9 5.10846V0.5C9 0.367392 9.05268 0.240215 9.14645 0.146447C9.24021 0.0526785 9.36739 0 9.5 0C9.63261 0 9.75979 0.0526785 9.85355 0.146447C9.94732 0.240215 10 0.367392 10 0.5Z" fill="#AAAAAA"/>
      </svg>
              </button>
              <button class="player__repeat-btn"><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6.50001C1.13261 6.5 1.25978 6.44732 1.35355 6.35356C1.44731 6.25979 1.49999 6.13262 1.5 6.00001C1.50105 5.07207 1.87013 4.18244 2.52628 3.52629C3.18243 2.87014 4.07206 2.50106 5 2.50001H11.7929L11.1464 3.14646C11.0527 3.24024 11 3.36742 11 3.50003C11 3.63264 11.0527 3.75982 11.1465 3.85359C11.2402 3.94735 11.3674 4.00003 11.5 4.00002C11.6326 4.00002 11.7598 3.94733 11.8536 3.85356L13.3536 2.35356C13.3553 2.35188 13.3567 2.34999 13.3583 2.34828C13.3681 2.33824 13.3777 2.32792 13.3866 2.31706C13.3918 2.31065 13.3964 2.3039 13.4013 2.29731C13.4061 2.29084 13.4112 2.28453 13.4157 2.27781C13.4208 2.27015 13.4252 2.26222 13.4299 2.25438C13.4336 2.24821 13.4374 2.24223 13.4408 2.23591C13.4451 2.22797 13.4487 2.21983 13.4525 2.21174C13.4556 2.20503 13.459 2.19844 13.4618 2.19154C13.4651 2.1837 13.4677 2.1757 13.4706 2.16774C13.4732 2.16029 13.4761 2.15297 13.4784 2.14537C13.4808 2.13734 13.4826 2.12916 13.4846 2.12104C13.4865 2.11336 13.4887 2.10572 13.4903 2.09788C13.4922 2.08845 13.4933 2.0789 13.4946 2.06935C13.4956 2.06272 13.4968 2.05622 13.4975 2.04951C13.5008 2.01659 13.5008 1.98343 13.4975 1.95051C13.4968 1.9438 13.4956 1.9373 13.4946 1.93067C13.4933 1.92112 13.4922 1.91157 13.4903 1.90214C13.4887 1.8943 13.4865 1.88667 13.4846 1.87898C13.4826 1.87086 13.4808 1.86268 13.4784 1.85466C13.4761 1.84706 13.4732 1.83973 13.4706 1.83229C13.4677 1.82432 13.4651 1.81633 13.4618 1.80848C13.459 1.80159 13.4556 1.79499 13.4525 1.78828C13.4487 1.78019 13.4451 1.77204 13.4408 1.76411C13.4374 1.75779 13.4336 1.75181 13.4299 1.74565C13.4252 1.7378 13.4208 1.72987 13.4157 1.72221C13.4112 1.71549 13.4061 1.70918 13.4013 1.70271C13.3964 1.69612 13.3918 1.68937 13.3866 1.68296C13.3775 1.67189 13.3678 1.66139 13.3578 1.65113C13.3563 1.64964 13.3551 1.64796 13.3536 1.64647L11.8536 0.146465C11.7598 0.0526909 11.6326 5.74377e-06 11.5 4.69616e-10C11.3674 -5.74283e-06 11.2402 0.0526683 11.1465 0.146435C11.0527 0.240201 11 0.367378 11 0.49999C11 0.632601 11.0527 0.759783 11.1464 0.853558L11.7929 1.50001H5C3.80694 1.50135 2.66313 1.97589 1.8195 2.81951C0.975881 3.66314 0.501344 4.80695 0.5 6.00001C0.500006 6.13262 0.552687 6.25979 0.646454 6.35356C0.740221 6.44732 0.867394 6.5 1 6.50001Z" fill="#AAAAAA"/>
      <path d="M12.9999 5.5C12.8673 5.50001 12.7402 5.55269 12.6464 5.64645C12.5526 5.74022 12.5 5.86739 12.4999 6C12.4989 6.92794 12.1298 7.81757 11.4737 8.47372C10.8175 9.12987 9.92788 9.49895 8.99995 9.5H2.20705L2.85352 8.85355C2.94729 8.75977 2.99996 8.63259 2.99996 8.49998C2.99995 8.36737 2.94727 8.24019 2.85349 8.14642C2.75972 8.05266 2.63254 7.99998 2.49993 7.99999C2.36731 7.99999 2.24014 8.05268 2.14637 8.14645L0.64637 9.64645C0.644875 9.64795 0.643624 9.64963 0.642144 9.65112C0.632164 9.66138 0.62246 9.67187 0.613381 9.68295C0.608116 9.68936 0.603524 9.69611 0.598626 9.7027C0.593804 9.70917 0.588784 9.71548 0.584282 9.7222C0.579157 9.72986 0.574699 9.73779 0.570046 9.74564C0.566384 9.7518 0.562523 9.75778 0.559136 9.7641C0.554879 9.77203 0.551277 9.78018 0.547478 9.78827C0.544335 9.79498 0.540962 9.80157 0.538109 9.80847C0.534859 9.81631 0.532234 9.82431 0.529396 9.83227C0.526741 9.83972 0.523872 9.84704 0.521569 9.85464C0.519142 9.86267 0.517342 9.87085 0.515327 9.87897C0.513405 9.88665 0.511223 9.89429 0.509667 9.90213C0.507792 9.91156 0.50663 9.92111 0.505318 9.93066C0.504387 9.93729 0.503106 9.94379 0.502449 9.9505C0.499184 9.98342 0.499184 10.0166 0.502449 10.0495C0.503106 10.0562 0.504387 10.0627 0.505318 10.0693C0.506631 10.0789 0.50779 10.0884 0.509667 10.0979C0.511223 10.1057 0.513405 10.1133 0.515327 10.121C0.517342 10.1292 0.51914 10.1373 0.521569 10.1454C0.523872 10.153 0.526741 10.1603 0.529396 10.1677C0.532234 10.1757 0.534859 10.1837 0.538109 10.1915C0.540962 10.1984 0.544335 10.205 0.547478 10.2117C0.551277 10.2198 0.554879 10.228 0.559136 10.2359C0.562523 10.2422 0.566386 10.2482 0.570046 10.2544C0.574699 10.2622 0.579155 10.2701 0.584282 10.2778C0.588782 10.2845 0.593804 10.2908 0.598626 10.2973C0.603524 10.3039 0.608116 10.3106 0.613381 10.317C0.622292 10.3279 0.631829 10.3382 0.641609 10.3483C0.643272 10.35 0.644676 10.3519 0.64637 10.3535L2.14637 11.8535C2.1928 11.9 2.24792 11.9368 2.30858 11.9619C2.36924 11.9871 2.43426 12 2.49993 12C2.56559 12 2.63061 11.9871 2.69127 11.962C2.75194 11.9368 2.80706 11.9 2.85349 11.8536C2.89993 11.8071 2.93676 11.752 2.96189 11.6914C2.98702 11.6307 2.99996 11.5657 2.99996 11.5C2.99996 11.4344 2.98703 11.3693 2.96191 11.3087C2.93678 11.248 2.89995 11.1929 2.85352 11.1465L2.20705 10.5H8.99995C10.193 10.4987 11.3368 10.0241 12.1804 9.1805C13.0241 8.33687 13.4986 7.19306 13.4999 6C13.4999 5.86739 13.4473 5.74022 13.3535 5.64645C13.2597 5.55269 13.1326 5.50001 12.9999 5.5Z" fill="#AAAAAA"/>
      </svg>
              </button>
            </div>
            <div class="player__controls__footer"> <span class="player__time-start">0:26</span>
              <div class="player__range-play" id="range-play"></div><span class="player__time-end">${getTimeString(this.trackData.duration)}</span>
            </div>
          </div>
          <div class="player__volume"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9.5H1C0.867392 9.5 0.740215 9.44732 0.646447 9.35355C0.552678 9.25979 0.5 9.13261 0.5 9V5C0.5 4.86739 0.552678 4.74021 0.646447 4.64645C0.740215 4.55268 0.867392 4.5 1 4.5H4L8.5 1V13L4 9.5Z" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 4.5V9.5" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.9124 5.58582C11.0981 5.77153 11.2454 5.99201 11.3459 6.23466C11.4464 6.47731 11.4981 6.73739 11.4981 7.00003C11.4981 7.26267 11.4464 7.52274 11.3459 7.7654C11.2454 8.00805 11.0981 8.22853 10.9124 8.41424" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
            <div class="player__volume-range" id="range-volume"></div>
          </div>
        </div>
      </footer>
    `;
  }

  public addOnPlayListener(callback: () => void): void {
    const playButton: HTMLElement | null =
      document.getElementById('player-play');

    console.log('playButton');
    console.log(playButton);

    if (playButton) {
      playButton.addEventListener('click', callback);
    }
  }

  public addOnStopListener(callback: () => void): void {
    const stopButton: HTMLElement | null =
      document.getElementById('player-stop');

    console.log('stopButton');
    console.log(stopButton);

    if (stopButton) {
      stopButton.addEventListener('click', callback);
      console.log('stop listener is binded');
    }
  }

  private getCenterButtonTemplate(status: PlayerStatus): string {
    return status === PlayerStatus.Stopped
      ? `
      <button class="player__play-btn" id="player-play">
        ${renderSvgSprite(playSprite.url, 'player__play-svg')}
      </button>
    `
      : `
      <button class="player__play-btn" id="player-stop">
        ${renderSvgSprite(stopSprite.url, 'player__play-svg')}
      </button>
      `;
  }
}
