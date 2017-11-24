import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

import { TipoEjercicioServiceProvider } from '../../providers/tipo-ejercicio-service/tipo-ejercicio-service';

@Component({
  selector: 'tipoEjercicio',
  templateUrl: 'tipoEjercicio.html'
})
export class TipoEjercicio {

  // Lista de tipo de ejercicio
  listTipoEjercicio: any;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
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

  /**
   * Abre el detalle de un tipo de ejercicio
   * @param tipoEjercicio
   */
  openTipoEjercicio(tipoEjercicio) {
    let alertTipoEjercicio =  this.alertCtrl.create({
      title: 'Tipo Ejercicio',
      subTitle: 'Al eliminar un tipo de ejercicio se eliminarán todos los ejercicios asociados al tipo',
      inputs: [
        {
          name: 'id',
          value: tipoEjercicio.id,
          type: 'hidden'
        },
        {
          name: 'descripcion',
          placeholder: 'Nombre Tipo Ejercicio',
          value: tipoEjercicio.descripcion
        },
        {
          name: 'unidadMedida',
          placeholder: 'Tipo de Medida',
          value: tipoEjercicio.unidadMedida
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Se ha pulsado sobre el botón guardar');
            if(data.id===''){
              this.tipoEjercicioServiceProvider.create(data).then(
                () => {
                  console.log('El Tipo de Ejercicio se ha actualizado correctamente');
                  console.log('Actualizamos la lista de tipos de ejercicios');
                  this.recuperarListTipoEjercicios();
                }
              ).catch(error => console.error(error));
            }else{
              this.tipoEjercicioServiceProvider.update(data).then(
                () => {
                  console.log('El Tipo de Ejercicio se ha actualizado correctamente');
                  console.log('Actualizamos la lista de tipos de ejercicios');
                  this.recuperarListTipoEjercicios();
                }
              ).catch(error => console.error(error));
            }
          }
        },
        {
          text: 'Eliminar',
          handler: data => {
            console.log('Se ha pulsado sobre el botón eliminar');
            if(data.id!=='') {
              this.deleteTipoEjercicio(data);
            }
          }
        }
      ]
    });
    alertTipoEjercicio.present();
  }

  /**
   * Mensajes de confirmacion para eliminar un tipo de ejercicio
   * @param tipoEjercicio
   */
  deleteTipoEjercicio(tipoEjercicio) {
    let alertDeleteTipoEjercicio = this.alertCtrl.create({
      title: 'Eliminar Ejercicio',
      subTitle: '¿Está seguro de que desea eliminar el tipo de ejercicio ' + tipoEjercicio.descripcion + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.tipoEjercicioServiceProvider.delete(tipoEjercicio).then(
              () => {
                console.log('El Tipo de Ejercicio se ha eliminado correctamente');
                console.log('Actualizamos la lista de tipos de ejercicios');
                this.recuperarListTipoEjercicios();
              }
            ).catch(error => console.error(error));
          }
        }
      ]
    });
    alertDeleteTipoEjercicio.present();
  }

  /**
   * Abre el detalle de un tipo de ejercicio para un tipo de ejercicio sin datos
   */
  createTipoEjercicio(){
    const tipoEjercicio = {id:'', descripcion:'', unidadMedida:''};
    this.openTipoEjercicio(tipoEjercicio);
  }

}
