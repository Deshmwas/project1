import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../Services/sign-in.service';
import { CartService } from '../cart.service'; // Import CartService

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  error = '';
  cartTotal: number = 0; // Variable to store cart total

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public signInService: SignInService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Calculate and set the cart total
    this.cartTotal = this.calculateCartTotal();
  }

  // Calculate total price of items in the cart
  calculateCartTotal(): number {
    const cartItems = this.cartService.getCart();
    return cartItems.reduce((acc, product) => acc + parseFloat(product.price), 0);
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
          localStorage.setItem('userId', response.userId);
          // Redirect to the payment page after successful login
          this.router.navigate(['/payment'], { state: { totalAmount: this.cartTotal } });
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
