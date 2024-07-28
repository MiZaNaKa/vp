var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var mysql = require('mysql');

class MongoDBService {

    constructor() {
        // this.dbUrl = 'mongodb://localhost:27017';
        this.con =  mysql.createConnection({
            host: "localhost",
            user: "yourusername",
            password: "yourpassword"
        });
    }

    async start() {
        const connection = mysql.createConnection({
            host: 'localhost', // Change to your server address                
            user: 'root', // Your database user
            password: '', // Your database password
            database: 'mydatabase' // Your database name
          });
        try {
              connection.connect((err) => {
                if (err) {
                  if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                  } else {
                    console.error('Database connection failed:', err);
                  }
                } else {
                  console.log('Connected to the database.');
                }
              });

              connection.end((err) => {
                if (err) {
                  console.error('Error closing the connection:', err);
                } else {
                  console.log('Connection closed.');
                }
              });
        }
        catch (err) {
            // errorlogger.error('Unable to connect to Mongodb. -' + err);
            console.log('Unable to connect to Mongodb. -' + err);
        }
    }

    async connect(url){
        var con = await mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

        this.db = con.db('clickr');  
    }



    close(done) {
        var mongoDBService = this;
        if (mongoDBService.db) {
            mongoDBService.db.close(function (err, result) {
                mongoDBService.db = null;
            })
        }
    }
}

module.exports = new MongoDBService()