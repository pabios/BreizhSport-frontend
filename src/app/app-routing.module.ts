import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import {BoutiqueComponent} from "./pages/boutique/boutique.component";

const routes: Routes = [
  // { path: 'posts', loadChildren: () => import ('./posts/posts.module').then(m=>m.PostsModule)},
  { path: 'contact', component: ContactPageComponent },
  { path: 'boutique', component: BoutiqueComponent },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
