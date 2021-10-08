import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancialInfo } from 'src/interfacesAndClass/DBInterfaces';
import { TaxService } from 'src/services/tax.service';

@Component({
  selector: 'app-financial-info',
  templateUrl: './financial-info.page.html',
  styleUrls: ['./financial-info.page.scss'],
})
export class FinancialInfoPage implements OnInit {

  mobile = false;

  financialInfo: FinancialInfo;

  userForm: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private taxService: TaxService) { }

  ngOnInit() {
    this.taxService.getFinancialInfo().then((info) => {
      this.financialInfo = info;
      console.log("here");
      this.userForm = this.fb.group({
        bank: [this.financialInfo.bankConsignements, Validators.required],
        income: [this.financialInfo.income, Validators.required],
        consuption: [this.financialInfo.consuption, Validators.required],
        assetsValue: [this.financialInfo.assetsValue, Validators.required],
        liabilitiesValue: [this.financialInfo.liabilitiesValue, Validators.required]
      });
    }).catch(() => {
      console.log("error");
      this.userForm = this.fb.group({
        bank: [null, Validators.required],
        income: [null, Validators.required],
        consuption: [null, Validators.required],
        assetsValue: [null, Validators.required],
        liabilitiesValue: [null, Validators.required]
      });
    });

  }

  async setInfo(): Promise<void> {
    const formValues = this.userForm.value;
    this.financialInfo = {
      bankConsignements: formValues.bank,
      income: formValues.income,
      consuption: formValues.consuption,
      assetsValue: formValues.assetsValue,
      liabilitiesValue: formValues.liabilitiesValue
    };
    try {
      if (this.financialInfo) {
        await this.taxService.updateFinancialInfo(this.financialInfo);
      } else {
        await this.taxService.createFinancialInfo(this.financialInfo);
      }
      this.router.navigate(['principal']);
    } catch{
      return;
    }
  }

}
