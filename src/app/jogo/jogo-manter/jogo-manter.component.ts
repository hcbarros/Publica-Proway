import { environment } from './../../../environments/environment';
import { Jogo } from './../jogo-classe/jogo';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-jogo-manter',
  templateUrl: './jogo-manter.component.html',
  styleUrls: ['./jogo-manter.component.scss']
})

/* ESTA CLASSE CONTROLA A ROTA DE RETORNO À TELA INICIAL E RECEBE O VALOR
 DO PLACAR A SER ATUALIZADO OU INSERIDO NA VARIAVEL DE AMBIENTE "lista" */
export class JogoManterComponent implements OnInit {


  jogo: Jogo = new Jogo();
  placar: string = '';
  stop: string = '';
  index: number = -1;
  operacao: string = 'Incluir';

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute
  ) { }


  /* O MÉTODO ABAIXO ANALISA SE HÁ ALGUM PARÂMETRO PASSADO NA ROTA
  QUE CORRESPONDE AO ÍNDICE DA LISTA PARA ATUALIZAR UM JOGO */
  ngOnInit(): void {

    this.index = this.routeActivated.snapshot.params.id;
    if(this.index != null && this.index >= 0 ) {

        this.operacao = 'Alterar';
        this.placar = environment.lista[this.index].placar.toString();
    }

  }


  /* O MÉTODO INCLUIR INSERE UM NOVO JOGO NA VARIÁVEL DE AMBIENTE "lista" */
  incluir(){

      if(this.placar.length === 0) {
        alert("Informe um placar!");
        return;
      }

      this.jogo.placar = parseInt(this.placar);
      let len = environment.lista.length;
      this.jogo.jogo = len === 0 ? 1 : environment.lista[len - 1].jogo + 1;
      environment.lista.push(this.jogo);

      this.voltar();
  }


  /* O MÉTODO ALTERAR ATUALIZA A VARIÁVEL DE AMBIENTE "lista" COM O NOVO PLACAR, NO
  INDICE PASSADO POR PARÂMETRO NA ROTA, REDIRECIONANDO O USUARIO À TELA INICIAL. */
  alterar() {

      if(this.placar.length === 0) {
        alert("Informe um placar!");
        return;
      }

      environment.lista[this.index].placar = parseInt(this.placar);

      this.voltar();
  }


  /* O MÉTODO VOLTAR REDIRECIONA O USUÁRIO À TELA INICIAL */
  voltar(){

    this.router.navigate(['/']);
  }


  /* O MÉTODO MASCARA IMPEDE QUE O USUÁRIO, QUANDO ESTIVER NA TELA DE ALTERAÇÃO, INSIRA
  QUALQUER VALOR NO CAMPO INPUT DIFERENTE DE UM INTEIRO POSITIVO MENOR QUE 1000. */
  mascara() {

    let p = this.placar;
    p = p.replace( /[^\d]/g, '' );
    if ( p.length > 3 ) p = this.stop;
    else this.stop = p;
    this.placar = p;
  }


}
