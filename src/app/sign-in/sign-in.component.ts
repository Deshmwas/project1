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
         localStorage.setItem('userId',response.userId);
          this.router.navigate(['/payment']);
        } else {
          alert(response.message);
        }
      },
     error: (err) => {
      alert(err); 
      console.log(err);
    }
    });
  }
}
