import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  mobile = false;
  socialSub: Subscription;

  constructor(private globalService: GlobalService, private socialService: SocialAuthService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  async signInWithGoogle() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.authService.socialAuth = true;
      this.authService.login({idGoogle:user.id,email:user.email}).then((res)=>{
        console.log(res);
        this.authService.setToken(res.token);
        this.router.navigate(['principal']);
      }).catch((error)=>{
        this.router.navigate(['register']);
      });
    });
  }

  signInWithFacebook(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['register']);
    });
  }
}
