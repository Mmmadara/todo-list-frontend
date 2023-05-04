import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { DeletedPostsComponent } from './layout/deleted-posts/deleted-posts.component';
import { IndexComponent } from './layout/index/index.component';
import { PostsComponent } from './layout/posts/posts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: IndexComponent, canActivate: [AuthGuardService] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuardService] },
  { path: 'deleted-posts', component: DeletedPostsComponent, canActivate: [AuthGuardService] },
  { path: '', component: IndexComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
