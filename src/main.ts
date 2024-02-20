import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { ImportProvidersSource, importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./app/ui/components/auth/guard/auth.guard";
import { provideHttpClient } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
     SweetAlert2Module.forRoot(),
      JwtModule.forRoot({
        config: {
          tokenGetter:()=> localStorage.getItem("accessToken"),
          allowedDomains:["localhost:8080"]
        }
      }),
      RouterModule.forRoot([
        {path:"", loadComponent:()=>import("./app/ui/components/layouts/layouts.component").then(c=>c.LayoutsComponent),canActivateChild:[AuthGuard],
        children:[
          {path:"", loadComponent:()=>import("./app/ui/components/blank/blank.component").then(c=>c.BlankComponent)},
          {path:"customers", loadComponent:()=>import("./app/ui/components/customers/customers.component").then(c=>c.CustomersComponent)},
          {path:"employies", loadComponent:()=>import("./app/ui/components/employies/employies.component").then(c=>c.EmployiesComponent)},
          {path:"departments", loadComponent:()=>import("./app/ui/components/department/department.component").then(c=>c.DepartmentComponent)},
          {path:"requests", loadComponent:()=>import("./app/ui/components/requests/requests.component").then(c=>c.RequestsComponent)},
          {path:"sales", loadComponent:()=>import("./app/ui/components/sales/sales.component").then(c=>c.SalesComponent)},
          {path:"users", loadComponent:()=>import("./app/ui/components/user/user.component").then(c=>c.UserComponent)},

        ]
         },
         {path:"login", loadComponent:()=>import("./app/ui/components/auth/login/login.component").then(c=>c.LoginComponent)},
         {path:"register", loadComponent:()=>import("./app/ui/components/auth/register/register.component").then(c=>c.RegisterComponent)},
         {path:"updatepassword/:userId/:resetToken", loadComponent:()=>import("./app/ui/components/auth/password-update/password-update.component").then(c=>c.PasswordUpdateComponent)},
         {path:"resetpassword", loadComponent:()=>import("./app/ui/components/auth/password-reset/password-reset.component").then(c=>c.PasswordResetComponent)},
         {path:"charts", loadComponent:()=>import("./app/ui/components/charts/charts.component").then(c=>c.ChartsComponent)}

      ])
    )
  ]
})
