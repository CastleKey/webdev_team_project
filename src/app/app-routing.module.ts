import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent }   from './home/home.component';
import { StrainComponent }   from './strain/strain.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {AboutComponent} from './about/about.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'strain/:strain_name', component: StrainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
