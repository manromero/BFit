import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TipoEjercicio } from '../pages/tipoEjercicio/tipoEjercicio';

import { SQLite } from '@ionic-native/sqlite';

import { TipoEjercicioServiceProvider } from '../providers/tipo-ejercicio-service/tipo-ejercicio-service';
import { DiaTrabajoServiceProvider } from '../providers/dia-trabajo-service/dia-trabajo-service';
import { EjercicioServiceProvider } from '../providers/ejercicio-service/ejercicio-service';
import { SerieServiceProvider } from '../providers/serie-service/serie-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: any;

  constructor(
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sqlite: SQLite,
              private tipoEjercicioServiceProvider: TipoEjercicioServiceProvider,
              private diaTrabajoServiceProvider: DiaTrabajoServiceProvider,
              private ejercicioServiceProvider: EjercicioServiceProvider,
              private serieServiceProvider: SerieServiceProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      // Inicializamos la base de datos
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this.tipoEjercicioServiceProvider.setDatabase(db);
        this.diaTrabajoServiceProvider.setDatabase(db);
        this.ejercicioServiceProvider.setDatabase(db);
        this.serieServiceProvider.setDatabase(db);
        console.log('Creando tabla si no existe Tipo Ejercicio...');
        this.tipoEjercicioServiceProvider.createTable().then(
          () => {
            console.log('Tabla Tipo Ejercicio creada...');
            console.log('Creando tabla Día de Trabajo...');
            this.diaTrabajoServiceProvider.createTable().then(
              () => {

                this.ejercicioServiceProvider.createTable().then(
                  ()=>{
                    console.log('Tabla Ejercicio creada...');
                    console.log('Creando Tabla serie...');
                    this.serieServiceProvider.createTable().then(

                      () => {
                        console.log('Tabla Serie creada...');
                        console.log('Inicializando Tipos de ejercicio Paso 1...');
                        this.tipoEjercicioServiceProvider.inicializarTablePaso1().then(

                          () => {
                            console.log('Paso 1 Terminado...');
                            console.log('Inicializando Tipos de ejercicio Paso 2...');
                            this.tipoEjercicioServiceProvider.inicializarTablePaso2().then(

                              () => {
                                console.log('Paso 2 Terminado...');
                                console.log('Inicializando Tipos de ejercicio Paso 3...');

                                this.tipoEjercicioServiceProvider.inicializarTablePaso3().then(

                                  () => {

                                    console.log('Paso 3 Terminado...');
                                    console.log('Se ha inicializado correctamente la tabla tipos de ejercicios');
                                    console.log('Tras crear base de datos vamos a la página inicial');
                                    // Añadimos la pagina principal y la gestión de tipos de ejercicios
                                    this.pages = [];
                                    this.pages.push({ title: 'Principal', component: HomePage });
                                    this.pages.push({ title: 'Gestión Tipologías', component: TipoEjercicio });
                                    this.splashScreen.hide();
                                    this.rootPage = HomePage;
                              }

                            );

                          }

                        );

                      }

                    );
                  }

                );

              }
            );

          }

        )
      });

      });
  }

}
