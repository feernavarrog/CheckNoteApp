import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbtaskService {

  public database!: SQLiteObject;

  userTable: string = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, image TEXT, active INTEGER NOT NULL, name TEXT NOT NULL, lastname TEXT, nac TEXT, dir TEXT);";
  taskTable: string = "CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY NOT NULL, id_user INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, image TEXT, status INTEGER NOT NULL);";
  noteTable: string = "CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY NOT NULL, id_user INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, image TEXT, status INTEGER NOT NULL);";
  imageTable: string = "CREATE TABLE IF NOT EXISTS image (id INTEGER PRIMARY KEY NOT NULL, id_user INTEGER NOT NULL, element INTEGER NOT NULL, id_element INTEGER NOT NULL, image TEXT NOT NULL);";

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private dataSubjects: { [key: string]: BehaviorSubject<any[]> } = {};

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) { 
    this.crearDB();
  }

  // Crear base de datos
  crearDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'user.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.crearTablas();
        })
        .catch(e => {
          console.log(e); //log
        });
    });
  }

  // Crear tablas
  async crearTablas() { 
    try {
        // Crear tablas
      await this.database.executeSql(this.taskTable, []); // Crear tabla de tarea
      await this.database.executeSql(this.imageTable, []); // Crear tabla de imágen
      await this.database.executeSql(this.userTable, []); // Crear tabla de usuario
      await this.database.executeSql(this.noteTable, []);  // Crear tabla de nota

      this.isDBReady.next(true);                       
    } catch (e) {                                                          
      console.log(e); //log               
    }
  }

  // Cargar datos
  private async loadData(table: string) {
    try {
      const res = await this.database.executeSql(`SELECT * FROM ${table}`, []);
      const data = [];
      for (let i = 0; i < res.rows.length; i++) {
        data.push(res.rows.item(i));
      }
      if (!this.dataSubjects[table]) {
        this.dataSubjects[table] = new BehaviorSubject<any[]>([]);
      }
      this.dataSubjects[table].next(data);
    } catch (error) {
      console.error('Error loading data', error);
    }
  }

  // Obtener datos de forma observable
  getData(table: string): Observable<any[]> {
    if (!this.dataSubjects[table]) {
      this.dataSubjects[table] = new BehaviorSubject<any[]>([]);
      this.loadData(table); // Load data if not already loaded
    }
    return this.dataSubjects[table].asObservable();
  }

  // Añadir datos a la tabla de la base de datos
  async addData(table: string, data: any) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = new Array(values.length).fill('?').join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    try {
      await this.database.executeSql(sql, values);
      this.loadData(table); // Reload data after insert
    } catch (error) {
      console.error('Error adding data', error);
    }
  }

  //  Actualizar datos en la tabla de la base de datos
  async updateData(table: string, id: number, data: any) {
    const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id); // Añadir el id al final para la condición WHERE

    const sql = `UPDATE ${table} SET ${columns} WHERE id = ?`;

    try {
      await this.database.executeSql(sql, values);
      this.loadData(table); // Reload data after update
    } catch (error) {
      console.error(`Error updating data in table ${table}`, error);
    }
  }

  // Eliminar datos de la tabla de la base de datos
  async deleteData(table: string, id: number) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;

    try {
      await this.database.executeSql(sql, [id]);
      this.loadData(table); // Reload data after delete
    } catch (error) {
      console.error(`Error deleting data from table ${table}`, error);
    }
  }

  // Estado de la base de datos observable
  dbState() {
    return this.isDBReady.asObservable();
  }

  // Crear usuario en la base de datos
  updateUserdata(table: string, id: number, data: any) {
    const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const sql = `UPDATE ${table} SET ${columns} WHERE id = ?`;
      return this.database.executeSql(sql, values)
  }

  // Obtener datos de usuario de la base de datos
  getUserData(tabla: string): Promise<any[]> {
    return this.database.executeSql(`SELECT * FROM ${tabla}`, []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
      }
      return items;
    });
  }
}
