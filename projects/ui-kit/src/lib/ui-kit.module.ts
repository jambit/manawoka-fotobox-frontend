import {NgModule} from '@angular/core';
import {UiKitComponent} from './ui-kit.component';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {GDPRComponent} from './gdpr/gdpr.component';
import {PopupComponent} from './popup/popup.component';
import {CommonModule} from '@angular/common';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [UiKitComponent, GDPRComponent, PopupComponent, InfoPopupComponent, LoadingSpinnerComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule
  ],
  entryComponents: [GDPRComponent, PopupComponent],
  exports: [UiKitComponent, GDPRComponent]
})
export class UiKitModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerIcon('timer', 'timer-outline.svg');
    this.registerIcon('trash-can', 'trash-outline.svg');
    this.registerIcon('edit', 'options-outline.svg');
    this.registerIcon('arrow', 'arrow-forward-outline.svg');
    this.registerIcon('linkedin', 'logo-linkedin.svg');
    this.registerIcon('twitter', 'logo-twitter.svg');
    this.registerIcon('linkedin_selected', 'logo-linkedin-selected.svg');
    this.registerIcon('twitter_selected', 'logo-twitter-selected.svg');
    this.registerIcon('none', 'remove-circle-outline.svg');
    this.registerIcon('none_selected', 'remove-circle-outline-selected.svg');
    this.registerIcon('jambit-logo_selected', 'jambit-logo.svg');
    this.registerIcon('jambit-logo', 'jambit_logo.svg');
    this.registerIcon('back', 'back-outline.svg');
  }


  registerIcon(iconShortcut: string, iconName: string) {
    this.matIconRegistry.addSvgIcon(
      iconShortcut, this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${iconName}`));
  }

}
