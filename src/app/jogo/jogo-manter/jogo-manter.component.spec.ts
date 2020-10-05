import { environment } from './../../../environments/environment';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JogoManterComponent } from './jogo-manter.component';
import { Jogo } from './../jogo-classe/jogo';


describe('JogoManterComponent', () => {
  let component: JogoManterComponent;
  let fixture: ComponentFixture<JogoManterComponent>;
  let jogo: Jogo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ JogoManterComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(JogoManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jogo = new Jogo();
  });


  it('Deve criar o componente jogo-manter', () => {
    expect(component).toBeTruthy();
  });


  it('Clicar no botão incluir com algum valor no input, deve inserir um jogo na variavel sistêmica "lista" ', () => {

    component.placar = '10';
    let len = environment.lista.length;
    const btnIncluir = fixture.debugElement.query(By.css('#incluir'));
    btnIncluir.triggerEventHandler('click', null);

    expect(environment.lista.length).toEqual(len + 1);
  });


  it('O método alterar deve alterar o valor do "placar" no índice  da lista indicado', async(() => {

    jogo.jogo = 1;
    jogo.placar = 10;
    environment.lista[0] = jogo;

    component.placar = '11';
    component.index = 0;
    component.alterar();

    expect(environment.lista[0].placar).toEqual(11);
  }));


  it('O arquivo html deve conter um elemento <label> com o texto "Placar:"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const b = bannerElement.querySelector('label');
    expect(b.textContent).toEqual('Placar:');
  });


  it('O componente jogo-manter deve conter 2 botões aparecendo', async(() => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const buttons = bannerElement.querySelectorAll('button');

    expect(buttons.length).toEqual(2);
  }));



});
