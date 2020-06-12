import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import {PhotoboothService} from './services/photobooth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [CoreComponent],
  imports: [HttpClientModule],
  providers: [PhotoboothService],
  exports: [CoreComponent]
})
export class CoreModule { }
