const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 8100;

var con = mysql.createConnection({
host: "localhost",
user: "calendar",
password: "projectPlus2022",
database: "calendar"
});


con.connect(function(err) {
  if(err){
      return console.error("error: " + err.message)
  }
  console.log("CONNECTION MADE WITH SQL SERVER!")
});

app 
    .use(express.static('js'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
   
    .post("/api/user", async(req,res) => {
      var sql = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}')`
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted")
      });

      con.end(function(err) {
        if (err) {
         return console.log('error:' + err.message);
       }
       console.log('Closed the database connection.');


      });
     
    
    })
      
   
 

    .listen(port, () => console.log(`server listening on port ${port}`));


