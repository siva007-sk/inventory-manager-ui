import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private _service: AppService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  signUp() {
    this.signUpForm.markAllAsTouched();
    const payload = this.signUpForm.getRawValue();
    this._service.post('/user/signUp', payload).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        Object.keys(this.signUpForm.controls).forEach((key) => {
          this.signUpForm.get(key)?.setErrors({ required: true });
        });
      }
    );
  }
}
