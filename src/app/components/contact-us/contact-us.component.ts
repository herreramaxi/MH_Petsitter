import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingRequest } from 'src/app/models/bookingRequest';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  form: FormGroup;
  subscriptionSave: Subscription | undefined;

  constructor(private fb: FormBuilder, private contactUsService: ContactUsService) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (!this.form.valid) return;

    var name = this.form.get('name')?.value;
    var email = this.form.get('email')?.value;
    var phone = this.form.get('phone')?.value;
    var message = this.form.get('message')?.value;

    var request = {
      name: name,
      email: email,
      phone: phone,
      message: message
    } as BookingRequest;

    console.log(request);

    this.subscriptionSave = this.contactUsService.sendRequest(request).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });


    // (next) => this.handleSuccessful(next, "Home profile updated"),
    // (error) => this.handleError(error, "Error when trying to update a home profile")

  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe();
  }
}
