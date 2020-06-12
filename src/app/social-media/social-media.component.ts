import {Component, OnInit} from '@angular/core';
import {MatChipSelectionChange} from '@angular/material/chips/chip';
import {PopupConfig, PopupType} from '../../../projects/ui-kit/src/lib/popup/PopupConfig';
import {PopupComponent} from '../../../projects/ui-kit/src/lib/popup/popup.component';
import {MatDialog} from '@angular/material/dialog';
import {SocialMediaContent} from '../../../projects/core/src/lib/models/SocialMediaContent';
import {PhotoboothService} from '../../../projects/core/src/lib/services/photobooth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {InfoPopupConfig} from '../../../projects/ui-kit/src/lib/info-popup/InfoPopupConfig';
import {InfoPopupComponent} from '../../../projects/ui-kit/src/lib/info-popup/info-popup.component';

const DOCKER_URL = 'http://localhost:8082';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  twitter = new SocialMedia(1, 'Twitter', SocialMediaPlatform.Twitter, 'twitter', false, this.postPhotoAtTwitter);
 // linkedIn = new SocialMedia(2, 'LinkedIn', SocialMediaPlatform.LinkedIn, 'linkedin', false, this.postPhotoAtLinkedIn);
  socialMedia = [];

  socialMediaContent: SocialMediaContent = {
    userName: '',
    content: '',
    isEditedImage: false
  };

  latestPhoto = '';


  constructor(public dialog: MatDialog, private photoboothService: PhotoboothService, private snackBar: MatSnackBar, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      isPhotoEdited: boolean
    };

    this.socialMediaContent.isEditedImage = state.isPhotoEdited;
  }

  ngOnInit(): void {
    this.setAutomaticallyNavigateBack();
    this.socialMedia = [this.twitter];
    this.getLatestPhoto();
    this.resetContent();
  }

  resetContent(): void {
    const content = {
      userName: '',
      content: '',
      isEditedImage: false
    };

    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      isPhotoEdited: boolean
    };

    this.socialMediaContent.isEditedImage = state.isPhotoEdited;

    this.socialMediaContent = content;
  }

  getLatestPhoto() {
    this.photoboothService.getTakenPhoto().subscribe(
      photo => {
        this.latestPhoto = `url(${DOCKER_URL}/${photo})`;
      }
    );
  }

  // TODO think about removing it
  onChipSelected($event: MatChipSelectionChange) {
    console.log(this.socialMedia.filter(socialMedia => socialMedia.isSelected));
  }

  selectChip(chipId: number) {
    this.socialMedia.find((socialMedia) => {
      if (socialMedia.id === chipId) {
        socialMedia.isSelected = !socialMedia.isSelected;
      }
    });

  }

  onSubmit(socialMedia: SocialMedia[], username: string, content: string) {
    this.socialMediaContent = new SocialMediaContent(username, content, this.socialMediaContent.isEditedImage);
    this.displayPopup(socialMedia.filter(media => media.isSelected), this.socialMediaContent);
  }

  displayPopup(socialMedia: SocialMedia[], content: SocialMediaContent) {
    const names: string[] = [];
    socialMedia.forEach(media => names.push(media.name));
    const popupConfig: PopupConfig = new PopupConfig({
      type: PopupType.ACCEPT,
      title: `Bild auf ${names} posten?`,
      content: `Diese Aktion kann nicht widerrufen werden. \n \nBist du sicher, dass du dieses Bild auf ${names} posten willst ?`,

    });

    if (names.length > 0) {
      const popup = this.dialog.open(PopupComponent, {data: popupConfig, panelClass: 'custom-popup'});

      popup.afterClosed().subscribe(shouldBePosted => {
        console.log(`Should be posted at ${socialMedia} : ${shouldBePosted}`);
        shouldBePosted ? this.postPhotoAtPlatform(socialMedia, content, names) : console.log('Denied');
      });
    } else {
      this.displayNotificationBar('Du musst mindesten einen Social Media Platform auswählen');
    }
  }

  setAutomaticallyNavigateBack() {
    const interval = setInterval(() => {
      clearInterval(interval);
      this.navigateBackToHomeScreen();
    }, 600000);
  }

  navigateBackToHomeScreen() {
    this.router.navigate(['home']);
  }

  navigateBack() {
    this.router.navigate(['preview']);
  }

  displayInfoPopup() {
    const popupConfig: InfoPopupConfig = new InfoPopupConfig({
      title: `Vielen Dank!`,
      content: `Dein Bild wurde gepostet. \n \nVielen dank, dass du unseren service in Anspruch nimmst. \n \nAuf Wiedersehen!`,
      interval: 4000
    });

    const popup = this.dialog.open(InfoPopupComponent, {data: popupConfig, panelClass: 'custom-popup'});

    const interval = setInterval(() => {
      clearInterval(interval);
      popup.close('closed');
    }, popupConfig.interval);

    popup.afterClosed().subscribe((result) =>
      this.navigateBackToHomeScreen());
  }

  postPhotoAtPlatform(platforms: SocialMedia[], content: SocialMediaContent, mediaName: string[]) {
    platforms.forEach((platform) => {
      platform.postAtPlatform(content, this.photoboothService);
      this.displayNotificationBar(`Dein Bild wurde auf ${mediaName} gepostet`);
    });
    this.displayInfoPopup();
  }

  postPhotoAtTwitter(content: SocialMediaContent, service: PhotoboothService) {
    console.log(content);
    service.postPhotoToTwitter(content).subscribe(
      response => console.log(response)
    );
    console.log('Post at twitter');
  }

  // TODO add content of linkedin
  postPhotoAtLinkedIn(content: SocialMediaContent, service: PhotoboothService) {
// TODO Post to LinkedIn
    service.postPhotoToLinkedIn(this.socialMediaContent).subscribe(
      response => console.log(response)
    );

    console.log('Post at linkedIn');
  }

  displayNotificationBar(message: string) {
    const hPosition: MatSnackBarHorizontalPosition = 'end';
    const vPosition: MatSnackBarVerticalPosition = 'bottom';
    const config = {
      duration: 2000,
      panelClass: 'custom-snack-bar',
      horizontalPosition: hPosition,
      verticalPosition: vPosition
    };
    this.snackBar.open(message, null, config);
  }

  toggleKeyboardOn() {
    this.photoboothService.toggleKeyboard('on').subscribe(
      response => console.log(response)
    );
  }

  toggleKeyboardOff() {
    this.photoboothService.toggleKeyboard('off').subscribe(
      response => console.log(response)
    );
  }
}

export interface SocialMedia {
  id: number;
  name: string;
  platform: SocialMediaPlatform;
  icon: string;
  selectedIcon: string;
  isSelected: boolean;
  postAtPlatform: (content: SocialMediaContent, photoboothService: PhotoboothService) => void;
}

export class SocialMedia {
  constructor(id: number, name: string, platform: SocialMediaPlatform, icon: string, isSelected: boolean, postAtPlatform: (content: SocialMediaContent, photoboothService: PhotoboothService) => void) {
    return {id, name, platform, icon, selectedIcon: icon + '_selected', isSelected, postAtPlatform};
  }
}

export enum SocialMediaPlatform {
  Twitter, LinkedIn
}
