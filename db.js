import r from "rethinkdb";
export class DB {
  connection = null;
  constructor(db) {
    r.connect({ host: "localhost", port: 28015, db }, (err, conn) => {
      if (err) {
        throw err;
      }
      this.connection = conn;
    });
  }
  run({ table, method, params }) {
    return new Promise((resolve, reject) => {
      r.table(table)
        [method](params)
        .run(this.connection, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
    });
  }
}
