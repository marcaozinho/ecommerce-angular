import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  // private route: ActivatedRoute
  public oferta: Oferta
  
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { 
    // this.route = route
  }

  ngOnInit() {
    this.route.snapshot.params['id']
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id)
    // })

    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        console.log(oferta)
        this.oferta = oferta
      })
      .catch((param: any) => {
        console.log(param)
      })
  }

}
