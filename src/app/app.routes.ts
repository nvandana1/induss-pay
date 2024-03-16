import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ContactComponent} from "./contact/contact.component";

export const routes: Routes = [{path:'',redirectTo:'main',pathMatch:"full"},{path: 'main', component: MainComponent},
  {path: 'contact', component: ContactComponent}];
