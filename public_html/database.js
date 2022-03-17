var mysql = require('mysql');

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


function createAccount(){
  var user_name = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  
  var sql = "INSERT INTO users VALUES ('"+user_name+"', '"+password+"', '"+email+"')"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted")
  });
  
  console.log('Registered Account');
}


/*
var sql = "INSERT INTO users VALUES ('waraylou100', 'vamp1234', 'waraylou@yahoo.com')"
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
*/

