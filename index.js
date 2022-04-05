const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const { Router } = require('express');
const { response } = require('express');
const req = require('express/lib/request');


dotenv.config();

const app = express();

const port = process.env.PORT || 8100;

// creates a value to represent one day's time in milliseconds 
const oneDay = 1000 * 60 * 60 * 24;
var sessions;


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
  cookie: {maxAge: oneDay }, 
  resave: true,
  saveUninitialized: true
}));


app.use(express.static(__dirname + '/public_html'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const redirectLogin = (req,res,next) => {
  if(!req.session.username){
    res.redirect('/index.html')
  }else{
    next()
  }
};

app.get('/month', redirectLogin, (req,res) =>{
  res.sendFile('/public_html/month.html',{root:__dirname})
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

  req.session.loggedin = true;
  req.session.username = req.body.username;

  res.redirect("/month");
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

        console.log(session)
        res.redirect("/month");
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

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  console.log(req.session)
  res.redirect('/')
})

app.listen(port, () => console.log(`server listening on port ${port}`));
