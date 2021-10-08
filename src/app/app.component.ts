import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/services/auth.service';
import { GlobalService } from 'src/services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
  activeUrl: string;
  constructor(private platform: Platform, public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.labels = this.platform.platforms();
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.activeUrl = val.url;
      }
    });
  }
}
