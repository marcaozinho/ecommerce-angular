import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'

import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

    // private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public getOfertasPorCategoria(categoria:string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public getOfertasPorId(id:number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => resposta.json()[0])
    }

    public getComoUsarOfertaPorId(id:number): Promise<String> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.json()[0].descricao
        })
    }

    // .then((resposta: any) => resposta.json().shift())

    // public getOfertas2(): Promise<Oferta[]> {
    //     return new Promise((resolve, reject) => {
    //         let deu_certo = true
    //         if (deu_certo) {
    //             // setTimeout(resolve(this.ofertas),3000) errado
    //             setTimeout(() => resolve(this.ofertas),3000)
    //             // resolve(this.ofertas)
    //         } else {
    //             reject({codigo_erro: 404, mensagem_erro: 'Servidor não encontrado'})
    //         }
    //     })
    //     .then((ofertas: Oferta[]) => {
    //         //tratativas adicionais antes de mandar no resolve acima
    //         console.log("Primeiro then")
    //         return ofertas
    //     })
    //     .then((ofertas: Oferta[]) => {
    //         //tratativas adicionais antes de mandar no resolve acima
    //         console.log("Segundo then")
    //         return new Promise((resolve2, reject2) => {
    //             setTimeout(() => { resolve2( ofertas ) },3000)
    //         })
    //         .then(( ofertas: Oferta[] ) => { 
    //             console.log('Terceiro then sendo executado após 3 segundos')
    //             return ofertas
    //         })
    //     })
    // }
}