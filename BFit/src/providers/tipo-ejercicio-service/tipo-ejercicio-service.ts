import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TipoEjercicioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TipoEjercicioServiceProvider {

  db: SQLiteObject = null;

  constructor() {
    console.log('Hello TipoEjercicioServiceProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tipoEjercicio(id INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, unidadMedida TEXT)';
    return this.db.executeSql(sql, []);
  }

  inicializarTablePaso1() {
    console.log('Se procede a vacioar la tabla de tipos de ejercicio...');
    let sDelete = "DELETE FROM tipoEjercicio";
    return this.db.executeSql(sDelete, []);
  }

  inicializarTablePaso2() {
    console.log('Se procede a insertar el primer registro en la tabla de tipos de ejercicio');
    let sInsert1 = "INSERT OR REPLACE INTO tipoEjercicio(id, descripcion, unidadMedida) VALUES (1, 'Flexiones', '');";
    return this.db.executeSql(sInsert1, []);
  }

  inicializarTablePaso3() {
    console.log('Se procede a insertar el segundo registro en la tabla de tipos de ejercicios.');
    let sInsert2 = "INSERT OR REPLACE INTO tipoEjercicio(id, descripcion, unidadMedida) VALUES (2, 'Plancha', 'seg')";
    return this.db.executeSql(sInsert2, []);
  }

  getAll(){
    let sql = 'SELECT * FROM tipoEjercicio';
    return this.db.executeSql(sql, [])
      .then(response => {
        let listTipoEjercicio = [];
        for (let index = 0; index < response.rows.length; index++) {
          listTipoEjercicio.push( response.rows.item(index) );
        }
        return Promise.resolve( listTipoEjercicio );
      })
      .catch(error => Promise.reject(error));
  }

  create(tipoEjercicio: any){
    let sql = 'INSERT INTO tipoEjercicio(descripcion, unidadMedida) VALUES(?,?)';
    return this.db.executeSql(sql, [tipoEjercicio.descripcion, tipoEjercicio.unidadMedida]);
  }

  update(tipoEjercicio: any){
    let sql = 'UPDATE tipoEjercicio SET descripcion=?, unidadMedida=? WHERE id=?';
    return this.db.executeSql(sql, [tipoEjercicio.descripcion, tipoEjercicio.unidadMedida, tipoEjercicio.id]);
  }

  delete(tipoEjercicio: any){
    let sql = 'DELETE FROM tipoEjercicio WHERE id=?';
    return this.db.executeSql(sql, [tipoEjercicio.id]);
  }

}
