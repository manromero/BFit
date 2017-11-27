import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { TipoEjercicioServiceProvider } from '../../providers/tipo-ejercicio-service/tipo-ejercicio-service';

@Component({
  selector: 'historico',
  templateUrl: 'historico.html'
})
export class Historico {

  // Lista de tipo de ejercicio
  listTipoEjercicio: any;

  // Id tipo de ejercicio seleccionado
  idTipoEjercicio: any;

  constructor(
    public navCtrl: NavController,
    private tipoEjercicioServiceProvider: TipoEjercicioServiceProvider
  ) {
    // Recuperamos los tipos de ejercicio
    this.recuperarListTipoEjercicios();
  }

  /**
   * Recupera la lista de tipos de ejercicios
   */
  recuperarListTipoEjercicios(){
    console.log('Recuperamos los tipos de ejercicios...');
    this.tipoEjercicioServiceProvider.getAll().then(data => {
        this.listTipoEjercicio = data;
      }
    );
  }

}
