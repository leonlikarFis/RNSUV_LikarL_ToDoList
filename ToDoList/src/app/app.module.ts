import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskItemComponent } from './task/task-item/task-item.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { FormsModule } from '@angular/forms';
import { taskInterceptor } from './services/task.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskCreateComponent,
    TaskItemComponent,
    TypeListComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TaskService,
    provideHttpClient(withInterceptors ([taskInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
