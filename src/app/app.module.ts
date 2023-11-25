import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PedingRequestComponent } from './peding-request/peding-request.component';
import { OrdersComponent } from './orders/orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { OrderFormComponentComponent } from './order-form-component/order-form-component.component';
import { OrdersService } from './orders.service';
import { ReceiptComponent } from './receipt/receipt.component';
import { PaymentComponent } from './payment/payment.component';
import { Search2Component } from './search2/search2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

 

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LandingPageComponent,
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    AdminDashboardComponent,
    PedingRequestComponent,
    OrdersComponent,
    SearchComponent,
    CartComponent,
    OrderFormComponentComponent,
    ReceiptComponent,
    PaymentComponent,
    Search2Component,
    
  ],
  imports: [
 
BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  
      
    
  ],
  exports: [RouterModule],
  providers: [OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
