import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the EjercicioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EjercicioServiceProvider {

  db: SQLiteObject = null;

  constructor() {
    console.log('Hello EjercicioServiceProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS ejercicio(id INTEGER PRIMARY KEY AUTOINCREMENT, idTipoEjercicio INTEGER, idDiaTrabajo INTEGER, FOREIGN KEY(idTipoEjercicio) REFERENCES tipoEjercicio(id), FOREIGN KEY(idDiaTrabajo) REFERENCES diaTrabajo(id))';
    return this.db.executeSql(sql, []);
  }

}
