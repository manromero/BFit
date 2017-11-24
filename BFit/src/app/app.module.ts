import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TipoEjercicio } from '../pages/tipoEjercicio/tipoEjercicio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Librerias para sqlite
 * ionic cordova plugin add cordova-sqlite-storage
 * npm install --save @ionic-native/sqlite
 */
import { SQLite } from '@ionic-native/sqlite';
import { TipoEjercicioServiceProvider } from '../providers/tipo-ejercicio-service/tipo-ejercicio-service';
import { DiaTrabajoServiceProvider } from '../providers/dia-trabajo-service/dia-trabajo-service';
import { EjercicioServiceProvider } from '../providers/ejercicio-service/ejercicio-service';
import { SerieServiceProvider } from '../providers/serie-service/serie-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TipoEjercicio
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TipoEjercicio
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TipoEjercicioServiceProvider,
    DiaTrabajoServiceProvider,
    EjercicioServiceProvider,
    SerieServiceProvider
  ]
})
export class AppModule {}
