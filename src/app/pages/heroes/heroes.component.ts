import { Component, OnInit } from '@angular/core';
import { faPlus, faSyncAlt, faExclamationTriangle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  faPlus=faPlus;
  faSyncAlt=faSyncAlt;
  faExclamationTriangle=faExclamationTriangle;
  faPen=faPen;
  faTrash=faTrash;

  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesServices.getHeroes().subscribe(resp => {
      this.heroes = resp
      this.cargando = false;
    })
  }

  borrarHeroe(heroe:HeroeModel, i:number){
    swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      showCancelButton: true,
      showConfirmButton:true,
    }).then(resp =>{
      if(resp.value){
        this.heroes.splice(i,1);
        this.heroesServices.borrarHeroe(heroe.id).subscribe();
      }
    })


    
  }

}
