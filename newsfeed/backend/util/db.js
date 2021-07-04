const mysql = require('mysql2')


const options={
    host:'127.0.0.1',
    user: 'root',
    port:3308,
    password:'azsxdcfv',
    database:'newsfeed'

}

const pool = mysql.createPool(options)

module.exports =pool.promise();