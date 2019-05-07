import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateProjectComponent } from './createProject/createProject.component';
import { LogInComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacyPolicy/privacyPolicy.component';
import { TermsOfUseComponent } from './termsOfUse/termsOfUse.component';
import { NavNoLogComponent } from './navNoLog/navNoLog.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { OneProjectComponent } from './oneProject/oneProject.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { PublicProfileComponent } from './publicProfile/publicProfile.component';
import { AuthGuard } from './_guard/auth.guard';

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: 'termsOfUse', component: TermsOfUseComponent },
    { path: 'login', component: LogInComponent },
    { path: 'navNoLog', component: NavNoLogComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'createProject', component: CreateProjectComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent },
    { path: 'pageNotFound', component: PageNotFoundComponent },
    { path: 'oneProject/:id', component: OneProjectComponent },
    { path: 'publicProfile/:id', component: PublicProfileComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    /* {path: '**', component: NotFoundComponent } */

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }