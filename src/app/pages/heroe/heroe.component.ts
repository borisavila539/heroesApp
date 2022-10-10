
import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faSmileWink,faDizzy, faSave } from '@fortawesome/free-solid-svg-icons';
import { HeroeModel } from 'src/app/models/heroe.model';
import {NgForm} from '@angular/forms'
import { HeroesService } from 'src/app/services/heroes.service';
import swal from'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faSmileWink=faSmileWink;
  faDizzy=faDizzy;
  faSave=faSave;

  heroe: HeroeModel = new HeroeModel();
  
  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if(id !== 'nuevo'){
      this.heroesService.getHeroe(id)
      .subscribe( (resp:any) =>{
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('formulario invalido')
      return;
    }

    swal.fire('Espere','Guardando informacion','info');
    swal.showLoading();

    let peticion: Observable<any>;
    if(this.heroe.id){
      peticion =  this.heroesService.actualizarHeroe(this.heroe);
    }else{
      peticion =  this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp=> {
      swal.fire(this.heroe.nombre,'Se actualizo correctamente','success');
    })

  }

}
