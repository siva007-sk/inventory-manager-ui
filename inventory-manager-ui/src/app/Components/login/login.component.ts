import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private _service: AppService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    const payload = this.loginForm.getRawValue();
    this._service.post('/user/login', payload).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        Object.keys(this.loginForm.controls).forEach((key) => {
          this.loginForm.get(key)?.setErrors({ required: true });
        });
      }
    );
  }
}
