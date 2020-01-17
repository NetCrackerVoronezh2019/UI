import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DialogsListComponent } from './ConversationComponents/dialogsList/dialogsList.component';
import { DialogComponent } from './ConversationComponents/dialog/dialog.component'


const appRoutes: Routes =[
  {path: 'dialogsList',component:DialogsListComponent},
  {path: 'dialog/:dialogId', component:DialogComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DialogsListComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
