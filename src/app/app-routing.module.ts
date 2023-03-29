import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PedingRequestComponent } from './peding-request/peding-request.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { OrderFormComponentComponent } from './order-form-component/order-form-component.component';


const routes: Routes = [
   { path: '', redirectTo:'admin-dashboard',pathMatch:'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'landing-page', component: LandingPageComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent  },
   { path: 'peding-request', component: PedingRequestComponent   },
   { path: 'orders', component: OrdersComponent   },
    { path: 'search', component: SearchComponent   },
   { path: 'cart', component: CartComponent   },
   { path: 'order-form-component', component: OrderFormComponentComponent  },
     
    

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
