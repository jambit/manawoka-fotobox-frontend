import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss']
})
export class GDPRComponent implements OnInit {
  header = 'Einwilligungserklärung gemäß DSGVO in die Verarbeitung von Daten durch ';
  jambitName = 'jambit GmbH';

  firstParagraphContent = 'Für unseren Dienst erfolgt die Verarbeitung folgender personenbezogener Daten:  \n' +
    '\n' +
    '- Fotos  \n' +
    '\n' +
    'Die oben genannten Daten werden gespeichert und möglicherweise für die jambit Unternehmenskommunikation genutzt (z.B. Küchenmonitore, Confluence, etc.). \n' +
    '\n' +
    'Sollten weitere Daten benötigt werden, braucht es dafür separat wieder die Zustimmung des Nutzers. Die Daten werden nach 5 Jahren gelöscht.';
  secondParagraphSubtitle = 'Widerrufsrecht';

  secondParagraphContent = 'Der Nutzer hat das Recht, diese Einwilligung jederzeit ohne Angaben einer Begründung mit Wirkung für die Zukunft zu widerrufen. Hierfür genügt eine E-Mail an communication@jambit.com. Die Rechtmäßigkeit, der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird durch den Widerruf nicht berührt.';
  thirdParagraphSubtitle = 'Folgen des Nicht-Zustimmens';

  thirdParagraphContent = 'Der Nutzer hat das Recht, dieser Einwilligungserklärung nicht zuzustimmen – da unsere Fotobox jedoch auf die Erhebung und Verarbeitung der zu Anfang genannten Daten angewiesen ist, würde eine Ablehnung eine Inanspruchnahme der Fotobox ausschließen.';

  fourthParagraphSubtitle = 'Zustimmung durch den Betroffenen';

  fourthParagraphContent = 'Mit der Zustimmung versichern alle, sich auf dem Foto befindlichen, Personen, der Erhebung und der Verarbeitung ihrer Daten durch die jambit GmbH zu den oben genannten Zwecken freiwillig zuzustimmen und über die Datenverarbeitung und ihre Rechte belehrt worden zu sein.';
  constructor() { }

  ngOnInit(): void {
  }

}
