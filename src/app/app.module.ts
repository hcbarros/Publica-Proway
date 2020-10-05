import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JogoComponent } from './jogo/jogo.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { JogoManterComponent } from './jogo/jogo-manter/jogo-manter.component';

@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    LayoutComponent,
    JogoManterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

/* ESSA CLASSE POSSUI A DECLARAÇÃO DOS COMPONENTES UTILIZADOS NO
 PROJETO E AS IMPORTAÇÕES NECESSÁRIAS PARA USO DAS FUNCIONALIDADES */

export class AppModule { }
