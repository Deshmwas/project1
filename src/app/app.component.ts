import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1';
authService: any;
 currentRoute: string | undefined;
 signedIn = false;

  logout() {
    this.signedIn = false;
    this.router.navigate(['/sign-in']);
  }

  // Call this method when the user signs in
  signIn() {
    this.signedIn = true;
  }

  // Call this method when the user signs out
  signOut() {
    this.signedIn = false;
  }


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
