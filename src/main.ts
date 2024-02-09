import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { ImportProvidersSource, importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./app/ui/components/auth/guard/auth.guard";
import { provideHttpClient } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
// const baseUrlProvider: ImportProvidersSource = { provide: 'baseUrl', useValue: 'https://localhost:8080/api', multi: true };
bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      JwtModule.forRoot({
        config: {
          tokenGetter:()=> localStorage.getItem("accessToken"),
          allowedDomains:["localhost:8080"]
        }
      }),

  // baseUrlProvider,
      RouterModule.forRoot([
        {path:"", loadComponent:()=>import("./app/ui/components/layouts/layouts.component").then(c=>c.LayoutsComponent),canActivateChild:[AuthGuard],
        children:[
          {path:"", loadComponent:()=>import("./app/ui/components/blank/blank.component").then(c=>c.BlankComponent)},
          {path:"customers", loadComponent:()=>import("./app/ui/components/customers/customers.component").then(c=>c.CustomersComponent)}
        ]
         },
         {path:"login", loadComponent:()=>import("./app/ui/components/auth/login/login.component").then(c=>c.LoginComponent)}

      ])
    )
  ]
})
