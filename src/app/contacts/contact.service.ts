import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Contact } from './contact.model';
import { ContactNumber } from '../shared/contactNumber.model';

@Injectable()
export class ContactService {
  contactsChanged = new Subject<Contact[]>();

  private contacts: Contact[] = [
    new Contact(
      'Abhijit Kulkarni',
      'kulkarni.abhijit89@gmail.com',
      'https://scontent.fnag1-2.fna.fbcdn.net/v/t1.0-9/14141581_1065885423465058_6292978282139441834_n.jpg?_nc_cat=0&oh=e75dd381e1c3c4f642f4fb6544d6cb01&oe=5BE4DDC6',
      [
        new ContactNumber('Mobile', 8626036379),
        new ContactNumber('Alternate No', 9168283232)
      ]),

    new Contact('Mark Zuckerberg ',
      'other_contact@abc.com',
      'https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/416x416.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044',
      [
        new ContactNumber('Mobile', 8626036379),
        new ContactNumber('Alternate No', 9168283232)
      ]),
      new Contact('Sunder Pichai',
      'other_contact@abc.com',
      'https://zdnet2.cbsistatic.com/hub/i/r/2017/07/10/8e1a7c08-99a5-4c5a-8310-0390b203675a/resize/770xauto/b31014ef34982eb8731b54efc7a3bedd/sundar-pichai.jpg',
      [
        new ContactNumber('Mobile', 8626036379),
        new ContactNumber('Alternate No', 9168283232)
      ])
  ];

  constructor() {}

  getContacts() {
    return this.contacts.slice();
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChanged.next(this.contacts.slice());
  }

  updateContact(index: number, newContact: Contact) {
    this.contacts[index] = newContact;
    this.contactsChanged.next(this.contacts.slice());
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactsChanged.next(this.contacts.slice());
  }
}
