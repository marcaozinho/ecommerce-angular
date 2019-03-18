import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Observable, Observer, Subject, observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import 'rxjs/Rx'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {

    //retorno oferta[]
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) //executa a ação do switchmap após 1 segundo
      .distinctUntilChanged()
      .switchMap((termoDaBusca: string) => {
        console.log('requisicao http para api')
        if(termoDaBusca.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }
        
        return this.ofertasService.pesquisaOfertas(termoDaBusca)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })
      
    //nao tem problema o subscribe ficar aqui, uma vez que está em watch ---- antigo mecanismo de busca
    // this.ofertas.subscribe((ofertas: Oferta[]) => { 
    //                         this.ofertasArray = ofertas 
    //                       }) 

    // let tempo = Observable.interval(2000)
    // tempo.subscribe((intervalo:number) => { console.log (intervalo) } )

    // Parametros do subscribe pq é o observador
    // Observavel = fonte de dados que é produzidos de forma assíncrona

    // Observável
    // let meuObservableTeste = Observable.create((observer: Observer<string>) => {
    //   observer.next('Primeiro evento da stream')
    //   observer.next('Segundo evento da stream')
    //   observer.complete()
    //   observer.error('Erro')
    //   observer.next('Terceiro evento da stream')
    // })

    // Observador
    // meuObservableTeste.subscribe(
    //   (resultado: any) => console.log(resultado),
    //   (error: any) => console.log(error),
    //   () => console.log("Stream de eventos finalizada!")     
    // )
  }

  // event: Event
  // public pesquisa(termoDaBusca: string): void  {
  //   // console.log((<HTMLInputElement>event.target).value)
  //   this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
  //   this.ofertas.subscribe(
  //     (data: Oferta[]) => console.log(data),
  //     (erro: any) => console.log('Erro status: ', erro.status),
  //     () => console.log('Fluxo de eventos completo!')
  //   )
  // }

  public pesquisa(termoDaBusca: string): void  {
    console.log('Keyup:', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void  {
    this.subjectPesquisa.next('')
  }

}
