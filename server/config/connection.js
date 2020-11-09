const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
      host: '127.0.0.1', 
      user: 'root', 
      password: '', 
      port: '3307', 
      database: 'assignment'
    });
conn.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});

module.exports = conn;