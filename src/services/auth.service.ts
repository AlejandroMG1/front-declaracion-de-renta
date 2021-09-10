import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/interfacesAndClass/DBInterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = environment.serverUrl;
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  public logedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  createUser(user: User): Promise<any> {
    return this.http.post(this.baseurl + "user/create/", user, { headers: this.httpHeaders }).toPromise();
  }

}
