import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PopupConfig} from '../popup/PopupConfig';
import {InfoPopupConfig} from './InfoPopupConfig';

@Component({
  selector: 'lib-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoPopupConfig) { }

  ngOnInit(): void {
  }

}
