import ProfileComponent from '../components/header/ProfileComponent';

import AvatarUrl from '../resources/img/user.jpg';

export type ProfileData = {
  avatarUrl: string;
  username: string;
};

export default class ProfilePresenter {
  private profileComponent: ProfileComponent;

  constructor(private parentElement: HTMLElement) {
    const profileData: ProfileData = {
      avatarUrl: AvatarUrl,
      username: 'Tatiana L.',
    };

    this.profileComponent = new ProfileComponent(profileData);

    this.parentElement.append(this.profileComponent.getElement());
  }
}
