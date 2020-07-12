import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {AddLinkComponent} from './component/add-link/add-link.component';


const routes: Routes = [
  {path: 'home' , component: HomeComponent },
  {path: 'add-link' , component : AddLinkComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
