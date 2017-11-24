import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the SerieServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SerieServiceProvider {

  db: SQLiteObject = null;

  constructor() {
    console.log('Hello SerieServiceProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS serie(id INTEGER PRIMARY KEY AUTOINCREMENT, volumen INTEGER, idEjercicio INTEGER, FOREIGN KEY(idEjercicio) REFERENCES ejercicio(id))';
    return this.db.executeSql(sql, []);
  }

}
