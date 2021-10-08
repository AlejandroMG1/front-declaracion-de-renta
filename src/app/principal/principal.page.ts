import { Component, OnInit } from '@angular/core';
import { TaxService } from 'src/services/tax.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  needDeclare = false;

  constructor(private taxService: TaxService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.taxService.needDeclare().then((need) => {
      this.needDeclare = need;
    });
  }

}
