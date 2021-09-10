import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
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
        console.log(user);
        this.userForm = this.fb.group({
          firstName: [this.socialUser.firstName, Validators.required],
          lastName: [this.socialUser.lastName, Validators.required],
          email: [this.socialUser.email, Validators.required],
          id: ['', Validators.required],
          phone: [null]
        });
      }

    });
    this.globalService.mobile.subscribe((plat) => {
      this.mobile = plat;
      this.size = (this.mobile) ? 12 : 6;
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

  access() {
    const formValues = this.userForm.value;
    let logUser: User = {
      documentId: formValues.id,
      documentType: 'Cedula de ciudadania',
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phone
    };
    if (this.socialUser.provider === 'GOOGLE') {
      logUser.googleId = this.socialUser.id;
    } else {
      logUser.facebookId = this.socialUser.id;
    }
    this.authService.logedUser.next(logUser);
    this.router.navigate(['principal']);
  }
}
