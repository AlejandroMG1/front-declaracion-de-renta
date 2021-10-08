import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { CreateUser } from 'src/interfacesAndClass/ApiInterfaces';
import { User } from 'src/interfacesAndClass/DBInterfaces';
import { AuthService } from 'src/services/auth.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mobile = false;

  size = 12;

  socialUser: SocialUser;

  userForm: FormGroup;

  userSub: Subscription;

  constructor(private globalService: GlobalService, private socialAuthService: SocialAuthService, private router: Router,
    private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (user) {
        this.userForm = this.fb.group({
          firstName: [this.socialUser.firstName, Validators.required],
          lastName: [this.socialUser.lastName, Validators.required],
          email: [this.socialUser.email, Validators.required],
          id: ['', Validators.required],
          phone: [null]
        });
      }else{
        this.router.navigate(['welcome']);
      }
    });
  }

  ionViewWillLeave() {
    this.userSub.unsubscribe();
  }

  signOut(): void {
    this.socialAuthService.signOut().then(() => {
      this.router.navigate(['welcome']);
    });
  }

  enter(): void {
    console.log(this.userForm.value);

  }

  async access() {
    const formValues = this.userForm.value;
    const logUser: CreateUser = {
      documentId: formValues.id,
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phone,
      idGoogle : this.socialUser.id,
    };
    try{
      await this.authService.createUser(logUser);
      const userLogIn = await this.authService.login(logUser);
      console.log(userLogIn.token);
      this.authService.setToken(userLogIn.token);
      this.router.navigate(['principal']);
    }catch(error){
      console.error(error);
    }
  }
}
