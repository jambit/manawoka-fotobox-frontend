import {Component, Inject, OnInit} from '@angular/core';
import {PopupConfig} from './PopupConfig';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  didYesClicked = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupConfig) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    console.log('No');
    this.didYesClicked = false;
  }

  onYesClick() {
    console.log('Yes');
    this.didYesClicked = true;
  }
}




