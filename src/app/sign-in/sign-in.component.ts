import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../Services/sign-in.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public signInService: SignInService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.signInService.login(this.signInForm.value).subscribe({
      next: (response) => {

        if (response.message === 'Successfully logged in.') {
          alert(response.message);
          let userEmail=this.signInForm.value.email;
         localStorage.setItem('userEmail', userEmail);
          this.router.navigate(['/landing-page']);
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        alert('An error occurred while logging in. Please try again later.');
        console.log(err);
      }
    });
  }
}
