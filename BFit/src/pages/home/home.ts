import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TipoEjercicio } from '../../pages/tipoEjercicio/tipoEjercicio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * Redirige la aplicación a tipo de ejercicio
   */
  irATipoEjercicio() {
    this.navCtrl.push(TipoEjercicio);
  }

}
