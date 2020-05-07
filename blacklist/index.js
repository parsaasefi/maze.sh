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

  get(hosts) {
    const searchArray = hosts.map(host => `host=${escape(host)}`);
    const search = searchArray.join(' OR ');

    const queryArray = ['SELECT * FROM blacklist WHERE'];
    const query = queryArray.concat(search).join(' ');

    return this.connection.query(query);
  }
}

module.exports = new Blacklist();
