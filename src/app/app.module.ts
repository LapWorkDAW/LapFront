import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './privacyPolicy/privacyPolicy.component';
import { GooglePlacesDirective } from './google/google-places.directive';
import { TermsOfUseComponent } from './termsOfUse/termsOfUse.component';
import { NavNoLogComponent } from './navNoLog/navNoLog.component';
import { CreateProjectComponent } from './createProject/createProject.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ChangePasswordComponent } from './ChangePassword/changePassword.component';
import { PublicProfileComponent } from './publicProfile/publicProfile.component';
import { MuroSendComponent } from './muroSend/muroSend.component';
import { OneProjectComponent } from './oneProject/oneProject.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("417274944677-emff9mcs5opsu1rip11e5r1rjvhm41ls.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LogInComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    GooglePlacesDirective,
    TermsOfUseComponent,
    ChangePasswordComponent,
    NavNoLogComponent,
    ContactComponent,
    ProfileComponent,
    CreateProjectComponent,
    SettingsComponent,
    ProjectsComponent,
    MuroSendComponent,
    OneProjectComponent,
    PublicProfileComponent

    /* ,
    UserSettingsComponent */
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    StorageServiceModule,
    ReactiveFormsModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
