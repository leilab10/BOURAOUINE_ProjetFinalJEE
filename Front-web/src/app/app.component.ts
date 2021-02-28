import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Builling-Front-web';

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
  }

  // tslint:disable-next-line:typedef
  isAdmin() {
    return this.authService.isAdmin();

  }

  // tslint:disable-next-line:typedef
  isUser() {

    return this.authService.isUser();
  }


  // tslint:disable-next-line:typedef
  isAuthenticated() {

    return this.authService.isAuthenticated();
  }

  // tslint:disable-next-line:typedef
  logOut() {

    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


}
