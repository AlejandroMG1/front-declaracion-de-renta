import { Component, OnInit } from '@angular/core';
import { TaxService } from 'src/services/tax.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  needDeclare = false;

  stamentDate: Date;

  constructor(private taxService: TaxService) { }

  ngOnInit() {
    this.taxService.statementDate().then((date) => {
      console.log(date);
      this.stamentDate = new Date(date.date);
    });
  }

  ionViewWillEnter() {
    this.taxService.needDeclare().then((need) => {
      this.needDeclare = need;
    });
  }

}
