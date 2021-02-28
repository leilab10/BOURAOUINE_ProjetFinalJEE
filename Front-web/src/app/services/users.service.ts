import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  public host = 'http://localhost:8080';
  // public accesToken: string | null | undefined;
  roles: Array<string> = [];

  // headers = new HttpHeaders();

  constructor(private http: HttpClient, private authService: AuthenticationService) {

    // this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // this.headers.set('Authorization', 'Bearer ' + this.authService.jwt);
  }

  // tslint:disable-next-line:typedef
  public getUsers() {
    /* if (this.authService.jwt == null) {
       this.authService.loadToken();
     }*/

    //  return this.http.get(this.host + '/users', {headers: this.headers});


    return this.http.get(this.host + '/users');
  }

  // tslint:disable-next-line:typedef
  public getRoles() {
    /*if (this.authService.jwt == null) {
      this.authService.loadToken();
    }*/

    // return this.http.get(this.host + '/roles', {headers: this.headers});
    return this.http.get(this.host + '/roles');
  }

  // tslint:disable-next-line:typedef
  public AddRoleToSelectedUser(RoleUserForm: any) {
    return this.http.post(this.host + '/addRoleToUser', RoleUserForm);
  }

  public RemoveRoleFromUser(RoleUserForm: any) {
    return this.http.post(this.host + '/removeRoleFromUser', RoleUserForm);
  }

  public DeleteUser(id: any) {
    return this.http.delete(this.host + '/deleteUser/' + id);
  }
}
