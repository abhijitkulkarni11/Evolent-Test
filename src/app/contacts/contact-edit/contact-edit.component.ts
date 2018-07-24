import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: number;
  editMode = false;
  contactForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newContact = new Contact(
    //   this.contactForm.value['name'],
    //   this.contactForm.value['email'],
    //   this.contactForm.value['imagePath'],
    //   this.contactForm.value['contactNumbers']);
    if (this.editMode) {
      this.contactService.updateContact(this.id, this.contactForm.value);
    } else {
      this.contactService.addContact(this.contactForm.value);
    }
    this.onCancel();
  }

  onAddContactNumber() {
    (<FormArray>this.contactForm.get('contactNumbers')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteContactNumber(index: number) {
    (<FormArray>this.contactForm.get('contactNumbers')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let contactName = '';
    let contactImagePath = '';
    let contactDescription = '';
    let contactContactNumbers = new FormArray([]);

    if (this.editMode) {
      const contact = this.contactService.getContact(this.id);
      contactName = contact.name;
      contactImagePath = contact.imagePath;
      contactDescription = contact.email;
      if (contact['contactNumbers']) {
        for (let contactNumber of contact.contactNumbers) {
          contactContactNumbers.push(
            new FormGroup({
              'name': new FormControl(contactNumber.name, Validators.required),
              'amount': new FormControl(contactNumber.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.contactForm = new FormGroup({
      'name': new FormControl(contactName, Validators.required),
      'imagePath': new FormControl(contactImagePath, Validators.required),
      'email': new FormControl(contactDescription, Validators.required),
      'contactNumbers': contactContactNumbers
    });
  }

}
