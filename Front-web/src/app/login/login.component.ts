import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode = 0;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  OnLogin(data: any) {
    console.log(data);
    this.authService.login(data)
      .subscribe(resp => {

        const myObjStr = JSON.stringify(resp);
        console.log(myObjStr);
        // @ts-ignore
        const jsonObject = JSON.parse(myObjStr);
        console.log(jsonObject);
        const jwtAccessToken = jsonObject.body['access-token'];
        const jwtRefreshToken = jsonObject.body['refresh-token'];
        console.log('jwtAccessToken:');
        console.log(jwtAccessToken);
        console.log('jwtRefreshToken');
        console.log(jwtRefreshToken);

        this.authService.saveToken(jwtAccessToken, jwtRefreshToken);
        this.router.navigateByUrl('/users');
      }, err => {
        this.mode = 1;
      });
  }

  // tslint:disable-next-line:typedef
  isAdmin() {
    return this.authService.isAdmin();
  }

  // tslint:disable-next-line:typedef
  isUser() {
    return this.authService.isUser();
  }

}
