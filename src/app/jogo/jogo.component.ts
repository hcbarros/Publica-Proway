import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {Jogo} from './jogo-classe/jogo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})

/*ESTA CLASSE CONTROLA AS ROTAS DE INCLUIR E ALTERAR, A EXCLUSÃO DE JOGOS, UTILIZANDO
 E INICIALIZANDO A VARIÁVEL DE AMBIENTE "lista" COM VALORES A SEREM EXIBIDOS NA TELA INICIAL */

export class JogoComponent implements OnInit {


  selecionado: Jogo;
  listaJogo: Jogo[] = [];

  constructor(
    private router: Router
  ) { }


  /*O METODO ABAIXO INICIALIZA A VARIAVEL DE AMBIENTE LISTA COM OBJETOS DO TIPO JOGO
    E RECALCULA OS SEUS VALORES */
  ngOnInit(): void {

    if(environment.lista.length === 0 && !environment.inicio ){
      environment.lista = [
            {jogo: 1, placar: 12, minimoTemp: 12, maximoTemp: 12, recordeMin: 0, recordeMax: 0},
            {jogo: 2, placar: 24, minimoTemp: 12, maximoTemp: 24, recordeMin: 0, recordeMax: 1},
            {jogo: 3, placar: 10, minimoTemp: 10, maximoTemp: 24, recordeMin: 1, recordeMax: 1},
            {jogo: 4, placar: 24, minimoTemp: 10, maximoTemp: 24, recordeMin: 1, recordeMax: 1}
        ];
      environment.inicio = true;
    }

    this.listaJogo = environment.lista;

    this.calcular();

  }


  /* O MÉTODO SELECIONAR ATRIBUI À VARIÁVEL "selecionado" O VALOR DA
  LISTA OBTIDO AO CLICAR EM ALGUM BOTÃO RADIO DA TELA INICIAL */
  selecionar(valor){
    this.selecionado = valor;
  }


  /* O MÉTODO INCLUIR ATUALIZA À VARIÁVEL DE AMBIENTE "lista" E
  E DIRECIONA O USUÁRIO PARA A TELA DE INCLUSÃO */
  incluir(){

    environment.lista = this.listaJogo;
    this.router.navigate(['/jogo/incluir']);
  }


  /* NO MÉTODO ALTERAR, CASO A VARIÁVEL "selecionado" NÃO SEJA NULA, ATUALIZA À VARIÁVEL
   DE AMBIENTE "lista" E DIRECIONA O USUÁRIO PARA A TELA DE ALTERAÇÃO */
  alterar(){

    if(this.selecionado == null) {
      alert("Selecione um jogo para alterar!");
      return;
    }

    environment.lista = this.listaJogo;
    this.router.navigate(['/jogo/alterar/'+this.listaJogo.indexOf(this.selecionado)]);
  }


  /* O MÉTODO EXCLUIR EXCLUI QUALQUER JOGO SELECIONADO
  DA LISTA DE JOGOS E RECALCULA OS VALORES DE CADA JOGO */
  excluir(item) {

    this.listaJogo = this.listaJogo.filter(
        obj => obj !== item
    );

    this.calcular();
  }


   /* O MÉTODO CALCULAR CALCULA E ATUALIZA OS
   VALORES DOS JOGOS CONTIDOS NA LISTA DE JOGOS */
  calcular() {

      this.listaJogo.map((jogo, index) => {

          if(index === 0) {
            jogo.minimoTemp = jogo.placar;
            jogo.maximoTemp = jogo.placar;
            jogo.recordeMin = 0;
            jogo.recordeMax = 0;
          }

          else {
              jogo.maximoTemp = this.listaJogo[index - 1].maximoTemp;
              jogo.recordeMax = this.listaJogo[index - 1].recordeMax;
              if(jogo.placar > jogo.maximoTemp) {
                 jogo.maximoTemp = jogo.placar;
                 jogo.recordeMax++;
              }

              jogo.minimoTemp = this.listaJogo[index - 1].minimoTemp;
              jogo.recordeMin = this.listaJogo[index - 1].recordeMin;
              if(jogo.placar < jogo.minimoTemp) {
                 jogo.minimoTemp = jogo.placar;
                 jogo.recordeMin++;
              }
          }

      });
  }


}
