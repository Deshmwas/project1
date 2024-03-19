// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SignInService } from './Services/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private signInService: SignInService) { }

  canActivate(): Observable<boolean> {
    return this.signInService.isLoggedIn().pipe(
      switchMap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return of(true);
        } else {
          console.error('User is not logged in.');
          return this.router.navigate(['/sign-in']).then(() => false);
        }
      }),
      catchError(error => {
        console.error('Error checking authentication:', error);
        return this.router.navigate(['/sign-in']).then(() => false);
      })
    );
  }
}
