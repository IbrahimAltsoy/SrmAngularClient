export class Navigation {
  routerLink: string = "";
  name: string = "";
  icon: string = "";
}
export const Navigations: Navigation[] = [
  { routerLink: "/", name:" Ana Sayfa",icon:"fa fa-home"},
  { routerLink: "/departments", name:"  Departmanlar ✓", icon:"fa fa-building"},
  { routerLink: "/employies", name:"  Çalışanlar ✓", icon:"fa fa-address-card"},
  { routerLink: "/requests", name:"  İstekler ✓", icon:"fa fa-question"},
  { routerLink: "/sales", name:"  Satışlar ✓", icon:"fa fa-check"},
  { routerLink: "/customers", name:"  Müsteriler ✓", icon:"fa fa-users"},
  { routerLink: "/users", name:"  Kullanıcılar", icon:"fa fa-user-plus"},
  { routerLink: "/register", name:"  Kayıt Ol", icon:"fa fa-address-card"},
]
// <i class="fa-solid fa-person-circle-question"></i>

