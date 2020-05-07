const mysql = require('mysql2/promise');
const { escape } = require('sqlstring');

const config = require('../config/blacklist');

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

  findHosts(hosts) {
    const query = `SELECT * FROM blacklist WHERE ${hosts
      .map(host => `host=${escape(host)}`)
      .join(' OR ')}`;

    return this.connection.query(query);
  }
}

module.exports = new Blacklist();
