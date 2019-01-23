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
import { GooglePlacesDirective } from './google-places.directive';
import { TermsOfUseComponent } from './termsOfUse/termsOfUse.component';
import { NavNoLogComponent } from './navNoLog/navNoLog.component';
import { ContactComponent } from './contact/contact.component';


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
    NavNoLogComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
