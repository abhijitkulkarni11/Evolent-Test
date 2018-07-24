import { ContactNumber } from '../shared/contactNumber.model';

export class Contact {
  public name: string;
  public email: string;
  public imagePath: string;
  public contactNumbers: ContactNumber[];

  constructor(name: string, desc: string, imagePath: string, contactNumbers: ContactNumber[]) {
    this.name = name;
    this.email = desc;
    this.imagePath = imagePath;
    this.contactNumbers = contactNumbers;
  }
}
