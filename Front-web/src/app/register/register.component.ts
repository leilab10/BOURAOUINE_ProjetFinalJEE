import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  new = 10;
  errorMsg: string | undefined;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  OnRegister(dataForm: any) {

    console.log(dataForm);
    this.authService.onRegister(dataForm).subscribe((data: any) => {
      this.user = data;
      this.new = 1;
      alert(' vous etes enregister avec succès!!!!');
      this.router.navigateByUrl('/users');
    }, (err: { error: { message: string | undefined; }; }) => {
      console.log(err);
      this.new = 0;
      this.errorMsg = err.error.message;
    });


  }


}
