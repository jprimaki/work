import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface ContactData {
  id: string;
  contactName: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { 
  }

  form: FormGroup = new FormGroup ( {
    $key: new FormControl(null),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.email)
  })

}
