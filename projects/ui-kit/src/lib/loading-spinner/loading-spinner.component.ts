import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InfoPopupConfig} from '../info-popup/InfoPopupConfig';

@Component({
  selector: 'lib-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoPopupConfig) { }

  ngOnInit(): void {
  }

}
