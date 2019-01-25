import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacyPolicy/privacyPolicy.component';
import { TermsOfUseComponent } from './termsOfUse/termsOfUse.component';
import { NavNoLogComponent } from './navNoLog/navNoLog.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: 'termsOfUse', component: TermsOfUseComponent },
    { path: 'login', component: LogInComponent },
    { path: 'navNoLog', component: NavNoLogComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }