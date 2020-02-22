import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
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
import { AddAdvertisementComponent } from './student/add-advertisement/add-advertisement.component';
import {AdvertisementComponent} from './allusers/advertisement/advertisement.component';
import { AllAdvertisementsComponent } from './allusers/all-advertisements/all-advertisements.component';
import { AdvertisementCardComponent } from './allusers/advertisement-card/advertisement-card.component';
import { RoleControlComponent } from './admin/role-control/role-control.component';
import {RegistrationComponent} from './registration/registration.component';
import {SignInComponent} from './sign-in/sign-in.component'
import { SubjectControlComponent } from './admin/subject-control/subject-control.component'
import { DialogsListComponent } from './ConversationComponents/dialogsList/dialogsList.component';
import { DialogComponent } from './ConversationComponents/dialog/dialog.component';

const appRoutes: Routes =[
  { path: 'registration', component:RegistrationComponent},
  { path: 'adv/:id', component:AdvertisementComponent},
  { path: 'alladv', component:AllAdvertisementsComponent},
  {path:'',component:HomeComponent},
  {path: 'signin',component:SignInComponent},
  {path:'activate/:activateCode',component:ActivatePageComponent},
  {path:'admin/changeprop',component:ChangeUserPropertiesComponent,canActivate:[AuthGuard]},
  {path: 'user/addnewAdvertisement',component:AddAdvertisementComponent},
  {path:'admin/rolecontrol', component:RoleControlComponent,canActivate:[AuthGuard]},
  {path:'admin/subjectcontrol', component:SubjectControlComponent,canActivate:[AuthGuard]},
  {path: 'dialogsList',component:DialogsListComponent},
  {path: 'dialog/:dialogId', component:DialogComponent}
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
    AdvertisementComponent,
    AllAdvertisementsComponent,
    AdvertisementCardComponent,
    RoleControlComponent,
    SubjectControlComponent,
    DialogsListComponent,
    DialogComponent
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
