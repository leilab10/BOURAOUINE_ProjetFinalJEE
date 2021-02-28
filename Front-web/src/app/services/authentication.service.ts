import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  public host2 = 'http://localhost:8080';
  jwt: string | null | undefined;
  refreshToken: string | null | undefined;
  username: undefined;
  roles: Array<any> = [];

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public login(data: any) {
    return this.http.post(this.host2 + '/login', data, {observe: 'response'});
  }

  /*saveToken(jwt: string | null) {
    this.jwt = jwt;
    if (jwt != null) {
      localStorage.setItem('token', jwt);
    }
    this.parseJWT();

  }*/

  // tslint:disable-next-line:typedef
  saveToken(jwt: string | null, refreshToken: string | null) {
    this.refreshToken = refreshToken;
    this.jwt = jwt;
    if (refreshToken != null) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (jwt != null) {
      localStorage.setItem('token', jwt);
    }

    this.parseJWT();

  }

  // tslint:disable-next-line:typedef
  parseJWT() {
    const jwtHelper = new JwtHelperService();
    // @ts-ignore
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  // tslint:disable-next-line:typedef
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  // tslint:disable-next-line:typedef
  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  // tslint:disable-next-line:typedef
  isAuthenticated() {
    return this.roles && this.isAdmin() || this.isUser();
  }

  // tslint:disable-next-line:typedef
  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    this.initParams();
  }

  // tslint:disable-next-line:typedef
  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = [];
  }

  // tslint:disable-next-line:typedef
  refreshAccessToken() {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.refreshToken});
    // headers.set('Authorization', 'Bearer ' + this.refreshToken);
    // @ts-ignore
    // return this.http.get(this.host2 + '/refreshToken', {headers: {skip: 'true'}}).toPromise().subscribe(resp => {
    // return this.http.get(this.host2 + '/refreshToken', {headers: {Anonymous: ''}}).pipe(resp => {
    return this.http.get(this.host2 + '/refreshToken', {headers}).pipe(resp => {

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
      localStorage.setItem('refreshToken', jwtRefreshToken);
      localStorage.setItem('token', jwtAccessToken);
    }, (err: any) => {
      console.log(err);
    });
    // return this.http.get(this.host2 + '/refreshToken');
  }

  // tslint:disable-next-line:typedef
  /*refreshAccessToken() {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.refreshToken);
    // @ts-ignore
    return this.http.get<any>(this.host2 + '/refreshToken', {headers}).pipe(tap((tokens: Tokens) => {
      // localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
      // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);

      // localStorage.setItem('refreshToken', refreshToken);

      // localStorage.setItem('token', jwt);

    }));
  }*/
  getRefreshToken() {
    return this.refreshToken;
  }

  getAccessToken() {
    return this.jwt;
  }

  onRegister(dataForm: any) {
    return this.http.post(this.host2 + '/users', dataForm);
  }
}
