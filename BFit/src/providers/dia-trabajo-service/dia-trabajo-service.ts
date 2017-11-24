import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DiaTrabajoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiaTrabajoServiceProvider {

  db: SQLiteObject = null;

  constructor() {
    console.log('Hello DiaTrabajoServiceProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS diaTrabajo(id INTEGER PRIMARY KEY AUTOINCREMENT, fecha DATETIME)';
    return this.db.executeSql(sql, []);
  }

}
