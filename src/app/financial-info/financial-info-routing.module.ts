import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialInfoPage } from './financial-info.page';

const routes: Routes = [
  {
    path: '',
    component: FinancialInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialInfoPageRoutingModule {}
