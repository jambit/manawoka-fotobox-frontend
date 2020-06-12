export interface InfoPopupConfig {
  title?: string;
  content: string;
  interval: number;
}

export class InfoPopupConfig {
  constructor(config: InfoPopupConfig) {
    return {
      title: config.title ? config.title : null,
      content: config.content,
      interval: config.interval ? config.interval : 5000
  }
    ;
  }
}
