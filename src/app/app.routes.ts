import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

 export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'}, //la page au démarrage
    { path: 'login', component: LoginComponent},
    { path: '**', component: PageNotFoundComponent}

];

