import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { DOSpaceService } from 'src/services/dospace.service';
import { TaxService } from 'src/services/tax.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  needDeclare = false;

  stamentDate: Date;

  fileName = 'prueba';

  user: SocialUser;

  constructor(private taxService: TaxService, private doService: DOSpaceService, private socialAuth: SocialAuthService) {
    this.socialAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.taxService.statementDate().then((date) => {
      this.stamentDate = new Date(date.date);
    });
  }

  ionViewWillEnter() {
    this.taxService.needDeclare().then((need) => {
      this.needDeclare = need;
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.doService.uploadFile(file, this.user.provider + this.user.id);
  }
}
