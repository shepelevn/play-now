import { ProfileData, getProfileData } from '../../api/profile';
import ProfileComponent from '../../components/header/ProfileComponent';

export default class ProfilePresenter {
  private readonly profileComponent: ProfileComponent;

  constructor(private readonly parentElement: HTMLElement) {
    const profileDataPromise: Promise<ProfileData> = getProfileData();

    this.profileComponent = new ProfileComponent();

    this.render();

    profileDataPromise.then((profileData) => {
      this.profileComponent.profileData = profileData;
      this.render();
    });
  }

  private render(): void {
    this.profileComponent.removeElement();

    this.parentElement.append(this.profileComponent.getElement());
  }
}
