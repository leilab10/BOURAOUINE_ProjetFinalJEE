import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {AuthGuard} from './guards/auth.guard';
import {RegisterComponent} from './register/register.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
