import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {PhotoboothService} from '../../../projects/core/src/lib/services/photobooth.service';


@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss']
})
export class LivefeedComponent implements OnInit {


  remainingTime;
  isTimerStarted: boolean;
  label = '';

  constructor(private snackBar: MatSnackBar, private router: Router, private photoboothService: PhotoboothService) {
  }

  ngOnInit(): void {
    this.resetTimer();
  }

  startTimer() {
    this.isTimerStarted = true;
    this.label = 'Timer läuft...';
    const interval = setInterval(() => {
      this.remainingTime = this.remainingTime - 1;
      if (this.remainingTime === 0) {
        clearInterval(interval);
        this.resetTimer();
        this.takePhoto();
      }
    }, 1000);
  }

  resetTimer() {
    this.remainingTime = 5;
    this.isTimerStarted = false;
  }

  takePhoto() {
    console.log('Took a photo');
    // TODO Backend call: Take pics
    this.photoboothService.takePhoto().subscribe(
      response => console.log(response)
    );
    this.displayNotificationBar();
  }

  displayNotificationBar() {
    const hPosition: MatSnackBarHorizontalPosition = 'end';
    const vPosition: MatSnackBarVerticalPosition = 'bottom';
    const config = {
      duration: 2000,
      panelClass: 'custom-snack-bar',
      horizontalPosition: hPosition,
      verticalPosition: vPosition
    };
    this.snackBar.open('Bild aufgenommen', null, config).afterDismissed()
      .subscribe(() => this.goToImagePreview());
  }

  goToImagePreview() {
    this.router.navigate(['preview']);
  }

  getLivefeed() {
    // TODO live feed
    const liveFeedUrl = '../../assets/test.png';
    return `url(${liveFeedUrl})`;
  }
}
