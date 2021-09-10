import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { GlobalService } from 'src/services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [];
  logged = false;
  socialUser: SocialUser;
  constructor(private platform: Platform, private authService: SocialAuthService, private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    this.labels = this.platform.platforms();
    this.globalService.mobile.next(this.labels.includes('android') || this.labels.includes('iphone'));
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(
      ()=>{
        console.log('refresh');
      },
      (error)=>{
        console.error(error);
        this.router.navigate(['welcome']);
      }
    );
    this.subcribeToLocalUser();
  }

  subcribeToLocalUser = () => {
    this.globalService.loggedUser.subscribe((user) => {
      this.socialUser = user;
      this.logged = (user != null);
    });
  };
}
