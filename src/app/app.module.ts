import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {SignInService} from './sign-in/Services/signIn.Service';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { DialogsComponent } from './dialogs/dialogs.component'


const appRoutes: Routes =[
  { path: 'registration', component:RegistrationComponent},
  {path: 'signin',component:SignInComponent},
  {path:'activate/:activateCode',component:ActivatePageComponent},
  {path: 'dialogs',component:DialogsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SignInComponent,
    ActivatePageComponent,
    DialogsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SignInService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
