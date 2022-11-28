import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { OversightComponent } from './oversight/oversight.component';
import { NgChartsModule } from 'ng2-charts';
import { OversightEntryComponent } from './oversight-entry/oversight-entry.component';
import { OversightEntryEditComponent } from './oversight-entry-edit/oversight-entry-edit.component';
import { CreateOversightComponent } from './create-oversight/create-oversight.component';
import { EditOversightComponent } from './edit-oversight/edit-oversight.component';
import { SettingsComponent } from './settings/settings.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    OversightComponent,
    OversightEntryComponent,
    OversightEntryEditComponent,
    CreateOversightComponent,
    EditOversightComponent,
    SettingsComponent,
    ForgottenPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
