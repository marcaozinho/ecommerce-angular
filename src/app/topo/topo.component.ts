import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisa(termoDaBusca: string): void  {
    // console.log((<HTMLInputElement>event.target).value)
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    this.ofertas.subscribe(
      (data: Oferta[]) => console.log(data),
      (erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos completo!')
    )
  }

}
