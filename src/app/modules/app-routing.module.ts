import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

import { LoginComponent } from "../components/login/login.component";
import { SignupComponent } from "../components/signup/signup.component";
import { UserComponent } from "../components/user/user.component";
import { AdminComponent } from "../components/admin/admin.component";

const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'user', component: UserComponent },
    { path: 'admin', component: AdminComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }