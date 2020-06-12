import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GDPRComponent} from '../../../projects/ui-kit/src/lib/gdpr/gdpr.component';
import {Router} from '@angular/router';
import {PopupComponent} from '../../../projects/ui-kit/src/lib/popup/popup.component';
import {PopupConfig, PopupType} from '../../../projects/ui-kit/src/lib/popup/PopupConfig';
import {PhotoboothService} from '../../../projects/core/src/lib/services/photobooth.service';
import {SocialMediaContent} from '../../../projects/core/src/lib/models/SocialMediaContent';
import {SocialMediaPlatform} from '../social-media/social-media.component';
import {MatChipSelectionChange} from '@angular/material/chips/chip';
import {InfoPopupConfig} from '../../../projects/ui-kit/src/lib/info-popup/InfoPopupConfig';
import {InfoPopupComponent} from '../../../projects/ui-kit/src/lib/info-popup/info-popup.component';
import {LoadingSpinnerComponent} from '../../../projects/ui-kit/src/lib/loading-spinner/loading-spinner.component';

const DOCKER_URL = 'http://localhost:8082';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  editMode = false;

  latestPhoto = '';

  defaultPhotoMode = new PhotoMode(1, 'kein Filter', 'none', true);
  jambitLogoPhotoMode = new PhotoMode(2, 'mit Logo', 'jambit-logo', false);

  photoModes = [];

  constructor(public dialog: MatDialog, private router: Router, private photoboothService: PhotoboothService) {
  }

  ngOnInit(): void {
    this.photoModes = [this.defaultPhotoMode, this.jambitLogoPhotoMode];
    this.getLatestPhoto();
  }

  getLatestPhoto() {
    if (!this.photoModes[1].isSelected) {
      this.photoboothService.getTakenPhoto().subscribe(
        photo => {
          this.latestPhoto = `url(${DOCKER_URL}/${photo})`;
        }
      );
    } else {
      this.photoboothService.getEditedPhoto().subscribe(
        photo => {
          this.latestPhoto = `url(${DOCKER_URL}/${photo})`;
        }
      );
    }
  }

  deletePhoto() {
    console.log('Delete pic');
    this.photoboothService.deletePhoto().subscribe(
      response => console.log(response)
    );
    this.photoboothService.deleteEditedPhoto().subscribe(
      response => console.log(response)
    );

    // TODO display popup

    this.displayInfoPopup();
  }

  displayInfoPopup() {
    const popupConfig: InfoPopupConfig = new InfoPopupConfig({
      title: `Dein Bild wurde gelöscht`,
      content: `Dein Bild wurde gelöscht. \n \nVielen dank, dass du unseren service in Anspruch nimmst. \n \nAuf Wiedersehen!`,
      interval: 4000
    });

    const popup = this.dialog.open(InfoPopupComponent, {data: popupConfig, panelClass: 'custom-popup'});

    const interval = setInterval(() => {
      clearInterval(interval);
      popup.close('closed');
    }, popupConfig.interval);

    popup.afterClosed().subscribe((result) =>
      this.router.navigate(['home']));
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // TODO think about removing it
  onChipSelected($event: MatChipSelectionChange) {
    console.log(this.photoModes.filter(photoMode => photoMode.isSelected));
    this.photoModes.find((photoMode) => {
      if (photoMode.isSelected && photoMode.id === 2) {
        this.displayLoadingSpinner();
      }
    });
  }

  selectChip(chipId: number) {
    this.photoModes.find((photoMode) => {
      photoMode.isSelected = photoMode.id === chipId;
    });
  }

  displayGDPRDialog() {
    const gdprDialog = this.dialog.open(GDPRComponent, {panelClass: 'custom-popup'});

    gdprDialog.afterClosed().subscribe(isTermAccepted => {
      console.log(`Accepted: ${isTermAccepted}`);
      this.processPicture(isTermAccepted);
    });
  }

  displayLoadingSpinner() {
    const popupConfig: InfoPopupConfig = new InfoPopupConfig({
      title: `Verarbeitet...`,
      content: `Bitte warte einen Moment \n \nWir sind dabei, deine Anfrage zu verarbeiten`,
      interval: 15000
    });

    const popup = this.dialog.open(LoadingSpinnerComponent, {data: popupConfig, panelClass: 'custom-popup-white'});

    const interval = setInterval(() => {
      clearInterval(interval);
      popup.close('closed');
    }, popupConfig.interval);

    popup.afterClosed().subscribe((result) =>
      this.getLatestPhoto());
  }


  processPicture(isTermAccepted: boolean) {
    if (isTermAccepted !== undefined) {
      isTermAccepted ? this.displaySocialMediaComponent() : this.displayDeletePopup();
    } else {
      console.log('Do it again');
    }
  }

  displaySocialMediaComponent() {
    let photoEdited: boolean;
    this.photoModes.find((photoMode) => {
      photoEdited = photoMode.isSelected && photoMode.id === 2;
    });
    this.router.navigate(['social-media-preview'], {state: {isPhotoEdited: photoEdited}});
  }

  displayDeletePopup() {
    const popupConfig: PopupConfig = new PopupConfig({
      type: PopupType.DELETE,
      title: 'Dein Bild löschen?',
      content: 'Diese Aktion kann nicht widerrufen werden. \n \nBist du sicher, dass du dieses Bild löschen möchtest?'
    });
    const deletePopup = this.dialog.open(PopupComponent, {data: popupConfig, panelClass: 'custom-popup'});

    deletePopup.afterClosed().subscribe(shouldBeDeleted => {
      console.log(`Should be deleted: ${shouldBeDeleted}`);
      shouldBeDeleted ? this.deletePhoto() : console.log('do it again');
    });
  }
}

export interface PhotoMode {
  id: number;
  label: string;
  icon: string;
  selectedIcon: string;
  isSelected: boolean;
}

export class PhotoMode {
  constructor(id: number, label: string, icon: string, isSelected: boolean) {
    return {id, label, icon, selectedIcon: icon + '_selected', isSelected};
  }
}

