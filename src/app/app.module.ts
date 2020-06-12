import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from '../../projects/core/src/lib/core.module';
import {UiKitModule} from '../../projects/ui-kit/src/lib/ui-kit.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from '../../projects/ui-kit/src/lib/material.module';
import {LivefeedComponent} from './livefeed/livefeed.component';
import {HttpClientModule} from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';
import { SocialMediaComponent } from './social-media/social-media.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LivefeedComponent,
    PreviewComponent,
    SocialMediaComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UiKitModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
