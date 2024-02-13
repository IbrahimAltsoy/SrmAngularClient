export class Navigation {
  routerLink: string = "";
  name: string = "";
  icon: string = "";
}
export const Navigations: Navigation[] = [
  { routerLink: "/", name:" Ana Sayfa",icon:"fa fa-home"},
  { routerLink: "/customers", name:" Müsteriler ✓", icon:"fa fa-users"},
  { routerLink: "/employies", name:" Çalışanlar ✓", icon:"fa fa-address-card"},
  { routerLink: "/departments", name:" Departmanlar", icon:"fa fa-building"},
  { routerLink: "/requests", name:" İstekler ✓", icon:"fa fa-building"},
  { routerLink: "/sales", name:" Satışlar ✓", icon:"fa fa-building"},
  { routerLink: "/users", name:" Kullanıcılar", icon:"fa fa-building"},
  { routerLink: "/register", name:" Kayıt Ol", icon:"fa fa-building"},
]
