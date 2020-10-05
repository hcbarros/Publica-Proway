import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JogoComponent } from './jogo.component';
import { Jogo } from './jogo-classe/jogo';


describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;
  let jogo: Jogo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ JogoComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(JogoComponent);
      component = fixture.componentInstance;

      jogo = new Jogo();
    });
  }));


  it('Deve criar um componente jogo', () => {
    expect(component).toBeTruthy();
  });


  it('A lista deve permitir insercao de dados', () => {

    let len = component.listaJogo.length;
    jogo.jogo = component.listaJogo[len - 1].jogo + 1;
    jogo.placar = 25;

    component.listaJogo.push(jogo);
    expect(component.listaJogo).toContain(jogo);
  });


  it('O método calcular deve atualizar o valor máximo da temporada', fakeAsync(() => {

    let len = component.listaJogo.length;
    component.listaJogo[len - 1].maximoTemp = 0;
    component.calcular();
    jogo = component.listaJogo[len - 1];

    expect(jogo.maximoTemp > 0).toBeTrue();
  }));


  it('O método excluir deve excluir um item da lista', () => {

    jogo = component.listaJogo[0];
    component.excluir(jogo);

    expect(component.listaJogo).not.toContain(jogo);
  });


  it('O arquivo html deve conter o texto "Jogo"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Jogo');
  });


  it('O arquivo html deve conter um elemento <button> com o texto "Incluir"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const b = bannerElement.querySelector('button');
    expect(b.textContent).toEqual('Incluir');
  });


  it('Clicar em algum botão radio atribui à variavel "selecionado" algum valor não nulo ', () => {

    const element: HTMLElement = fixture.nativeElement;
    const btnRadio = element.querySelector('input');
    btnRadio.click();

    expect(component.selecionado).not.toBeNull();
  });


});






