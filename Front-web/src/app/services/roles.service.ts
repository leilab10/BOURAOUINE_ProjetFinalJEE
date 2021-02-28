import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public host = 'http://localhost:8080';
  // public accesToken: string | null | undefined;
  roles: Array<string> = [];

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  public getRoles() {
    return this.http.get(this.host + '/roles');
  }

  public AddNewRole(RoleForm: any) {
    return this.http.post(this.host + '/roles', RoleForm);
  }

  public DeleteRole(id: any) {
    return this.http.delete(this.host + '/deleteRole/' + id);
  }

}
