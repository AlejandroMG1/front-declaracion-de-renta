import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  platforms: string[] = []

  size: number = 12

  socialUser: SocialUser;

  userForm: FormGroup;

  userSub: Subscription;

  constructor(private globalService: GlobalService, private authService: SocialAuthService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.userSub = this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      if (user) {
        this.userForm = this.fb.group({
          firstName: [this.socialUser.firstName, Validators.required],
          lastName: [this.socialUser.lastName, Validators.required],
          email: [this.socialUser.email, Validators.required],
          id: ['', Validators.required]
        })
      }

    });
    this.globalService.plaforms.subscribe((plat) => {
      this.platforms = plat
      this.size = (this.platforms.includes('android') || this.platforms.includes('iphone')) ? 12 : 6;
    })
  }

  ionViewWillLeave() {
    this.userSub.unsubscribe()
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['welcome'])
    });
  }

  enter(): void {
    console.log(this.userForm.value);

  }
}
