import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent }   from './home/home.component';
import { StrainComponent }   from './strain/strain.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { PersonalComponent } from './personal/personal.component';
import {AboutComponent} from './about/about.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'strain/:strain_name', component: StrainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search/user', component: SearchUserComponent },
  { path: 'profile/:userId', component: PersonalComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
