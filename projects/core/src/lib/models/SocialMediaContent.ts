export class SocialMediaContent {
  userName: string;
  content: string;
  isEditedImage: boolean;

  constructor(userName: string, content: string, isEditedImage: boolean) {
    this.userName = userName;
    this.content = content;
    this.isEditedImage = isEditedImage;
  }
}
