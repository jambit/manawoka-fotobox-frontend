import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LivefeedComponent} from './livefeed/livefeed.component';
import {PreviewComponent} from './preview/preview.component';
import {SocialMediaComponent} from './social-media/social-media.component';

const routes: Routes = [
  {path: 'main', component: HomeComponent},
  {path: 'live', component: LivefeedComponent},
  {path: 'preview', component: PreviewComponent},
  {path: 'social-media-preview', component: SocialMediaComponent},
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
