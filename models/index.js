const {Sequelize, DataTypes} = require('sequelize');
const mysql = require('mysql2');

let dbConfig = {
    "DB" : "pseudoBlogger",
    "USER" : "root",
    "PASSWORD" : "",
}

let sequelize = null;

if (process && process.env.mongoDB_URI){
    sequelize = new Sequelize(process.env.mongoDB_URI);
}else{
    const con = mysql.createConnection({
        host: 'localhost',
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
       });
    
       con.query(
        `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`,
      function (err, results) {
        console.log(results);
        console.log(err);
      });

    sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USER,
        dbConfig.PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306,
        },
    );
    
    sequelize.authenticate()
        .then(() => {
            console.log("Connected to DB");
        })
        .catch(e => {
            console.log(`Unable to connect to DB ${e}`)
        })
}

const db = {};
db.sequelize = sequelize;

db.Blog = require('./blogModel')(sequelize, DataTypes);

db.sequelize.sync().then(() => {
    console.log('DB synced with sequelize')
}).catch((err) => {
    console.error(`Error Syncing DB to sequelize ${err}`);
})

module.exports = db;