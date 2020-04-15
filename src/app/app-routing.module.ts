import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCitiesComponent} from './components/show-cities/show-cities.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: ShowCitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
