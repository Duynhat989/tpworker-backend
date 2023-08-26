const mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: '103.200.23.98',
    user: 'vinhcity_vietduy989',
    password: 'JHxS0qb{z[%7',
    database: 'vinhcity_base'
});
dbConn.connect()
module.exports = {
    dbConn
}