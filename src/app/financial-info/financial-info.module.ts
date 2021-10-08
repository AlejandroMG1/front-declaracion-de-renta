import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancialInfoPageRoutingModule } from './financial-info-routing.module';

import { FinancialInfoPage } from './financial-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancialInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FinancialInfoPage]
})
export class FinancialInfoPageModule {}
