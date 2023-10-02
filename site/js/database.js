const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mineturtle"
});

conn.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
});

function dbAddTurtle (x,y,z,facing,id,name) {

}