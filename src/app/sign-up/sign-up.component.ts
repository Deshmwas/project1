import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SignUpService } from '../Services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
 signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public signUpService: SignUpService) {
    this.signUpForm = new FormGroup({});
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
  console.log(this.signUpForm.value);
  this.signUpService.register(this.signUpForm.value).subscribe({
    next: (res) => {
      if (res) {
        alert("Registered successfully");
        // redirect to the signin page
        window.location.href = "/dashboard";
      }
    },
    error: (error) => {
      alert("Error occurred while registering");
      console.log(error);
    }
  })
}
}
