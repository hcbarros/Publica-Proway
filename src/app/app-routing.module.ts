import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
import { JogoManterComponent } from './jogo/jogo-manter/jogo-manter.component';


const routes: Routes = [
  {
    path: '',
    component: JogoComponent,
    pathMatch: 'full'
  },
  {
    path: 'jogo/incluir',
    component: JogoManterComponent,
    pathMatch: 'full'
  },
  {
    path: 'jogo/alterar/:id',
    component: JogoManterComponent,
    pathMatch: 'full'
  }

];

// ESSA CLASSE CONTÊM AS ROTAS QUE SERÃO UTILIZADAS NA NAVEGAÇÃO ENTRE AS TELAS

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
