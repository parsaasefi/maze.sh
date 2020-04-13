const mysql = require('mysql2/promise');

const config = require('../configs/blacklist');

class Blacklist {
  constructor() {
    this.connection = null;
  }

  connect() {
    const { host, port, user, password, database } = config;

    return mysql
      .createConnection({
        host,
        port,
        user,
        password,
        database,
      })
      .then(connection => {
        this.connection = connection;
      });
  }
}

module.exports = new Blacklist();
