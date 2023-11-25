import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MpesaService } from '../mpesa.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentAmount: number | undefined;
  selectedPaymentMethod: string | undefined;
  paymentCompleted: boolean = false;

  constructor(private router: Router, @Inject(MpesaService) private mpesaService: MpesaService) {}

  processPayment(): void {
    switch (this.selectedPaymentMethod) {
      case 'mpesa':
        // Call the MpesaService to make the payment
        this.mpesaService.makePayment().subscribe(
          (response: any) => {
            // Handle successful response
            console.log('M-Pesa payment successful:', response);
          },
          (error: any) => {
            // Handle error
            console.error('Error making M-Pesa payment:', error);
          }
        );
        break;
      case 'paypal':
        // Add logic for PayPal payment
        break;
      case 'cash':
        // Add logic for payment on delivery
        break;
      default:
        // Handle other payment methods
        break;
    }

    // Set paymentCompleted to true for confirmation message
    this.paymentCompleted = true;
  }

  handleOkay(): void {
    // Add any logic you want to execute when the "Okay" button is clicked
    console.log('Okay button clicked!');
    this.router.navigate(['/cart']);
  }
}
