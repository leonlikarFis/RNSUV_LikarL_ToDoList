import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskItemComponent } from './task/task-item/task-item.component';
import { authGuard } from './guards/auth';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'tasks/list', component: TaskItemComponent, canActivate: [authGuard] },
  { path: 'tasks/create', component: TaskCreateComponent, canActivate: [authGuard] },
  { path: 'types', component: TypeListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
