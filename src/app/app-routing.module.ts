import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    canActivate:[RegisterGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'financial-info',
    loadChildren: () => import('./financial-info/financial-info.module').then(m => m.FinancialInfoPageModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
