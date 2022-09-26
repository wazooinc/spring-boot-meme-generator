import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DesignerComponent} from "./designer/designer.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'meme-item/:id', component: DetailComponent },
  {path: 'meme-item', component: DesignerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
