import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-3a8b4-default-rtdb.firebaseio.com/'
  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/Heroes.json`,heroe)
    .pipe(
      map( (resp:any) =>{
        heroe.id = resp.name;
        return heroe;
      })
    )
  } 
  actualizarHeroe(heroe: HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    heroeTemp.id;
    return this.http.put(`${this.url}/Heroes/${heroe.id}.json`,heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/Heroes.json`)
    .pipe(
      map(this.crearArreglo),
      );
  }

  getHeroe(id:string){
    return this.http.get(`${this.url}/Heroes/${id}.json`)
  }

  borrarHeroe(id: string){
    return this.http.delete(`${this.url}/Heroes/${id}.json`)
  }

  private crearArreglo(heroeObj:any){

    const heroes: HeroeModel[] = [];
    Object.keys(heroeObj).forEach(key =>{
        const heroe:HeroeModel = heroeObj[key];
        heroe.id = key;
        heroes.push(heroe)
      })
    if(heroeObj === null) {return [];}
    return heroes;
  }
}
