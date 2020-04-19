import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SignInService} from './sign-in/Services/signIn.Service';
import {WebSocketService} from './home/Services/WebSocket.Service';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { ChangeUserPropertiesComponent } from './admin/change-user-properties/change-user-properties.component'
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {HttpModule} from '@angular/http';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { AddAdvertisementComponent } from './student/add-advertisement/add-advertisement.component';
import {AdvertisementComponent} from './allusers/advertisement/advertisement.component';
import { AllAdvertisementsComponent } from './allusers/all-advertisements/all-advertisements.component';
import { AdvertisementCardComponent } from './allusers/advertisement-card/advertisement-card.component';
import { DialogCardComponent } from './ConversationComponents/dialogCard/dialog-card.component';
import { RoleControlComponent } from './admin/role-control/role-control.component';
import {RegistrationComponent} from './registration/registration.component';
import {SignInComponent} from './sign-in/sign-in.component'
import { SubjectControlComponent } from './admin/subject-control/subject-control.component'
import { DialogsListComponent } from './ConversationComponents/dialogsList/dialogsList.component';
import { DialogComponent } from './ConversationComponents/dialog/dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateAdvertisementComponent } from './student/update-advertisement/update-advertisement.component';
import {MatBadgeModule} from '@angular/material/badge'
import { MatIconModule } from '@angular/material';
import { MyAdvertisementsComponent } from './student/my-advertisements/my-advertisements.component'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdvertisementFilterComponent } from './allusers/advertisement-filter/advertisement-filter.component';
import { NotificationsComponent } from './allusers/notifications/notifications.component';
import { MyOrdersComponent } from './allusers/my-orders/my-orders.component'
import { GroupComponent } from './UserAndGroupComponents/group/group.component';
import { MessageCardComponent} from "./ConversationComponents/messageCard/messageCard.component"
import { DialogMemberCardComponent } from "./ConversationComponents/dialogMemberCard/dialogMemberCard.component"
import {GroupCardComponent } from "./UserAndGroupComponents/group-card/group-card.component"
import {GroupListComponent} from "./UserAndGroupComponents/group-list/group-list.component"
import {UserCardComponent} from "./UserAndGroupComponents/userCard/userCard.component"
import {MiniGroupComponent} from "./UserAndGroupComponents/mini-group-card/mini-group-card.component";
import { EmailPageComponent } from './registration/email-page/email-page.component'
import {PostCardComponent} from './UserAndGroupComponents/post-card/post-card.component'
import {CommentCardComponent} from './UserAndGroupComponents/comment-card/comment-card.component'
import {FriendListComponent} from "./UserAndGroupComponents/friend-list/friend-list.component"
import {FriendCardComponent} from './UserAndGroupComponents/friend-card/friend-card.component';
import { Userpage2Component } from './userpage2/userpage2.component';
import { FeedbackComponent } from './allusers/my-orders/feedback/feedback.component'
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
  {path: 'dialog/:dialogId', component:DialogComponent},
  {path: 'groupPage/:groupId', component:GroupComponent},
  {path:'myadvertisements', component:MyAdvertisementsComponent},
  {path: "groupList", component:GroupListComponent},
  {path: 'myorders', component:MyOrdersComponent},
  {path:'myadvertisements', component:MyAdvertisementsComponent},
  {path:'email/:emailAdress',component:EmailPageComponent},
  {path: 'friends', component:FriendListComponent},
  {path: 'userPage/:id',component:Userpage2Component}
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
    DialogComponent,
    DialogCardComponent,
    NavbarComponent,
    UpdateAdvertisementComponent,
    MyAdvertisementsComponent,
    GroupComponent,
    MessageCardComponent,
    DialogMemberCardComponent,
    GroupCardComponent,
    GroupListComponent,
    UserCardComponent,
    AdvertisementFilterComponent,
    NotificationsComponent,
    MyOrdersComponent,
    MiniGroupComponent,
    EmailPageComponent,
    PostCardComponent,
    CommentCardComponent,
    FriendListComponent,
    FriendCardComponent,
    Userpage2Component,
    FeedbackComponent
  ],
  imports: [
    MatInputModule,
    MatBadgeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonToggleModule,
    HttpModule,
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
