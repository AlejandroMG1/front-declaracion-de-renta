import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/interfacesAndClass/ApiInterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = environment.serverUrl;
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  // public logedUser: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null);
  public token = new BehaviorSubject<string>('');
  public logged = false;
  public socialAuth = false;

  constructor(private http: HttpClient) { }

  createUser(user: CreateUser): Promise<any> {
    return this.http.post(this.baseurl + 'user/create/', user, { headers: this.httpHeaders }).toPromise();
  }

  login(user: CreateUser): Promise<any> {
    return this.http.post(this.baseurl + 'user/login/', user, { headers: this.httpHeaders }).toPromise();
  }

  setToken(token: string) {
    this.token.next(token);
    this.logged = true;
  }

  clearToken() {
    this.token.next('');
    this.logged = false;
  }
}
