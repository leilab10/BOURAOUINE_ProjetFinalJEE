import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public usersService: UsersService, private authService: AuthenticationService, private  router: Router) {

  }

  public selectedUsername: any;
  public users: any;
  public roles: any;
  public roleName: any;
  public username: any;
  public rolesOfUserSelected: any;
  roleUserForm = new RoleUserForm();

  ngOnInit(): void {
    try {
      this.usersService.getUsers().subscribe((data) => {
        this.users = data;
      }, (err: any) => {
        console.log(err);
      });

      this.usersService.getRoles().subscribe((data) => {
        this.roles = data;
      }, (err: any) => {
        console.log(err);
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  // tslint:disable-next-line:typedef
  onGetUsername(username: any) {
    this.roleUserForm.username = username;
    console.log(username);
  }

  onDeleteUser(id: any) {
    this.usersService.DeleteUser(id).subscribe(data => {
      alert('Utilisateur supprimé avec succès!!!!');
      this.ngOnInit();
    });

  }

  onRemoveRoleFromUser(roleName: any, username: any) {
    this.roleUserForm.roleName = roleName;
    this.roleUserForm.username = username;
    this.usersService.RemoveRoleFromUser(this.roleUserForm).subscribe(data => {
      alert('Role supprimé avec succès!!!!');
      this.ngOnInit();
    });

  }

  // tslint:disable-next-line:typedef
  onAddRoleToSelectedUser(roleName: any) {
    console.log(roleName);
    this.roleUserForm.roleName = roleName;
    console.log(this.roleUserForm);
    console.log(this.authService.roles.indexOf(roleName));
    this.ngOnInit();
    this.usersService.AddRoleToSelectedUser(this.roleUserForm).subscribe(data => {
      alert('Role ajouté à l\'utilisateur avec succès!!!!');
      this.ngOnInit();
    }, err => {
      console.log(err);
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

class RoleUserForm {
  username: string | undefined;
  roleName: string | undefined;

  constructor() {
  }

}


