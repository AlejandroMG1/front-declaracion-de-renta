import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  mobile = false;

  constructor(private globalService: GlobalService, private authService: SocialAuthService, private router: Router) { }

  ngOnInit() {
    this.globalService.mobile.subscribe((plat)=>{
      this.mobile = plat;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      this.router.navigate(['register']);
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(()=>{
      this.router.navigate(['register']);
    });
  }
}
