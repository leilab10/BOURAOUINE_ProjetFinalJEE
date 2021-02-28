import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {RolesService} from '../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(public rolesService: RolesService, private authService: AuthenticationService, private  router: Router) {
  }

  public roles: any;

  ngOnInit(): void {
    try {

      this.rolesService.getRoles().subscribe((data) => {
        this.roles = data;
      }, (err: any) => {
        console.log(err);
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  // tslint:disable-next-line:typedef
  onAddNewRole(dataForm: any) {
    this.rolesService.AddNewRole(dataForm).subscribe(data => {
      alert('Role ajouté avec succès!!!!');
      this.ngOnInit();
    }, err => {
      console.log(err);
    });

  }

  onDeleteRole(id: any) {
    this.rolesService.DeleteRole(id).subscribe(data => {
      alert('Role supprimé avec succès!!!!');
      this.ngOnInit();
    });

  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }
}



