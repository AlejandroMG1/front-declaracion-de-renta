import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Document } from 'src/interfacesAndClass/DBInterfaces';
import { DocumentsService } from 'src/services/documents.service';
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

  fileName = '';

  file: File;

  userDocuments: Document[] = [];

  user: SocialUser;

  constructor(private taxService: TaxService, private doService: DOSpaceService, private socialAuth: SocialAuthService,
    public documentsService: DocumentsService) {
    this.socialAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.taxService.statementDate().then((date) => {
      this.stamentDate = new Date(date.date);
    });
    this.documentsService.getFiles();
  }

  ionViewWillEnter() {
    this.taxService.needDeclare().then((need) => {
      this.needDeclare = need;
    });
  }

  async uploadFile() {
    const extIndex = this.findExtension(this.file.name);
    const ext = (this.file.name.substring(extIndex, this.file.name.length));
    await this.doService.uploadFile(this.file, this.user.provider + this.user.id, this.fileName + ext);
    this.file = null;
    this.fileName = '';
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  deleteDoc(doc: Document) {
    this.doService.deleteFile(doc);
  }

  private findExtension(name: string) {
    let currentIndex = 0;
    for (let i = 0; i < name.length; i++) {
      if (name[i] === '.') {
        currentIndex = i;
      }
    }
    return currentIndex;
  }
}
