import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
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
import { ChangeUserPropertiesComponent } from './admin/change-user-properties/change-user-properties.component'
import {MatTableModule} from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { AddAdvertisementComponent } from './user/add-advertisement/add-advertisement.component'; 


const appRoutes: Routes =[
  { path: 'registration', component:RegistrationComponent},
  {path:'',component:HomeComponent},
  {path: 'signin',component:SignInComponent},
  {path:'activate/:activateCode',component:ActivatePageComponent},
  {path:'admin/changeprop',component:ChangeUserPropertiesComponent,canActivate:[AuthGuard]},
  {path: 'user/addnewAdvertisement',component:AddAdvertisementComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SignInComponent,
    ActivatePageComponent,
    ChangeUserPropertiesComponent,
    HomeComponent,
    AddAdvertisementComponent,
   
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SignInService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
