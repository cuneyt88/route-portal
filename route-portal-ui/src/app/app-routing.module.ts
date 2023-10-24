import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkComponent } from './park/park.component';

const routes: Routes = [
  { path: 'park', component: ParkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
