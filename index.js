const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const { response } = require('express');


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

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(__dirname + '/public_html'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
   
app.get('/', (req, res) => {
  res.sendFile('/public_html/index.html');
});


app.post("/api/user", (req,res) => {
  var sql = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}')`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted")
  });

  // con.end(function(err) {
  //   if (err) {
  //     return console.log('error:' + err.message);
  //   }
  //   console.log('Closed the database connection.');
  // });
  //res.send("<h1>All OK</h1>")
  req.session.loggedin = true;
  req.session.username = req.body.username;

  res.redirect("/month.html");
  });
      
  
app.post("/api/login", (req,res) => {
  var username = req.body.username;
  var password = req.body.password;

  if(username && password){
    var sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    con.query(sql, function(err, results, fields){
      if (err) {
        console.log('error:' + err.message);
        throw err;
      }
      if(results.length > 0){
        req.session.loggedin = true;
        req.session.username = username;
        
        res.redirect("/month.html");
      } else {
        //filler for now, can clean up later
        res.send(`
          <script>
            alert("Username and Password do not match");
            window.location.href = "/index.html";
          </script>`);
      }
      res.end();
    }); 
  } else{
    res.end();
  }
});

//WIP
app.post("/api/events", (req,res) => {
  //need to add event title to database? Also haven't figured out the colors or events yet so not added
  var sql = `INSERT INTO events VALUES ('id', '${req.session.username}', '${req.body.start}', '${req.body.end}', '${req.body.location}', '${req.body.description}', 'NULL', 'NULL')`
  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Event added");
  })
  res.redirect('back')
});

app.listen(port, () => console.log(`server listening on port ${port}`));
