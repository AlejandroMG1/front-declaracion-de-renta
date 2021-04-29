import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public plaforms: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public loggedUser: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  constructor() { }
}
