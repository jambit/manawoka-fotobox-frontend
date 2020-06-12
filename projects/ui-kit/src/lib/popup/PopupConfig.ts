export enum PopupType {
  DELETE, ACCEPT
}

export interface PopupConfig {
  title?: string;
  content: string;
  type: PopupType;
  yesButtonLabel?: string;
  noButtonLabel?: string;
}

export class PopupConfig {
  constructor(config: PopupConfig) {
    return {
      title: config.title ? config.title : null,
      content: config.content,
      type: config.type,
      yesButtonLabel: config.yesButtonLabel ? config.yesButtonLabel : 'Ja',
      noButtonLabel: config.noButtonLabel ? config.noButtonLabel : 'Nein'
    };
  }
}
