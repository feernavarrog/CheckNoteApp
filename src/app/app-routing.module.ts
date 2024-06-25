import { NgModule } from '@angular/core';
import { authguardGuard } from './services/authguard.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [authguardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tasklist',
    loadChildren: () => import('./pages/tasklist/tasklist.module').then( m => m.TasklistPageModule),
    canActivate: [authguardGuard]
  },
  {
    path: 'viewelement',
    loadChildren: () => import('./pages/viewelement/viewelement.module').then( m => m.ViewelementPageModule),
    canActivate: [authguardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'userinfo',
    loadChildren: () => import('./pages/userinfo/userinfo.module').then( m => m.UserinfoPageModule),
    canActivate: [authguardGuard]
  },
  {
    path: 'notelist',
    loadChildren: () => import('./pages/notelist/notelist.module').then( m => m.NotelistPageModule),
    canActivate: [authguardGuard]
  },
  { path: '404', component: PageNotFoundComponent }, // Implementacion de la pagina 404 y page not found
  { path: '**', redirectTo: '/404' } // Implementacion de la pagina 404
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
