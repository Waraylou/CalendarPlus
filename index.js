const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');

//for push notifcations
const webpush = require("web-push");
const path = require("path");

//start of app
const app = express();

//for push notifcations
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());


dotenv.config();

const port = process.env.PORT || 8100;

// creates a value to represent one day's time in milliseconds 
const oneDay = 1000 * 60 * 60 * 24;


var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
});


con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message)
  }
  console.log("CONNECTION MADE WITH SQL SERVER!")
});


app.use(session({
  secret: 'secret',
  cookie: { maxAge: oneDay },
  resave: true,
  saveUninitialized: true
}));


app.use(express.static(__dirname + '/public_html'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const redirectLogin = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
};

//vapid keys for notifcations
const publicVapidKey = 'BCgJmeu9sb3HFPjJjR6TNjFzpOgRbN3B6v1re-X1hesVc4tTQurwFlpnMJmydy8Y0srsAioOW9hBrPphQYhfEFI';
const privateVapidKey = 'VlH2vs-cV8CSf0lsAUwyslDpaUKrXVUunjXXc80PLgI';

webpush.setVapidDetails(
  "mailto:test@mail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: `Hello ${req.session.username}` });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

//end push notifcation


app.get('/month', redirectLogin, (req,res) =>{
  
  res.sendFile('/public_html/month.html',{root:__dirname})

});


app.get('/EventsData', redirectLogin, (req, res) => {
  var sql = `SELECT * FROM events WHERE user_name = '${req.session.username}';`
  con.query(sql, function (err, result) {
    // order by date
    result.sort(function (a, b) {
      return new Date(a.eventStart) - new Date(b.eventStart);
    });
    if (err) throw err;

    else {
      //console.log(result)
      res.send(result)
    }
  });
});

app.get('/day', redirectLogin, (req, res) => {
  res.sendFile('/public_html/day.html', { root: __dirname })
});

app.get('/week', redirectLogin, (req, res) => {
  res.sendFile('/public_html/week.html', { root: __dirname })
});

app.get('/year', redirectLogin, (req, res) => {
  res.sendFile('/public_html/year.html', { root: __dirname })
});

app.get('/schedule', redirectLogin, (req, res) => {
  res.sendFile('/public_html/schedule.html', { root: __dirname })
});

//inserts user into the database
app.post("/api/user", (req, res) => {
  var sql = `SELECT * FROM users WHERE user_name = '${req.body.username}'`
  con.query(sql, function (err, result) {
    if (err) {
      console.log("1 record inserted")
      throw err;
    }
    if (result.length > 0) {
      console.log("USER EXISTS");
      res.redirect("/")
    }
    else {
      sql = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}')`
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
    }
  });

});

// queries the database and if credntials match those in the database, the user will be redirected to the month page
// if the user fails to match the credentials in the database an error will appear
app.post("/api/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    var sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    con.query(sql, function (err, results, fields) {
      if (err) {
        console.log('error:' + err.message);
        throw err;
      }
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;

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
  } else {
    res.end();
  }
});


app.post("/updateEvent", (req, res) => {
  //need to add event title to database? Also haven't figured out the colors or events yet so not added
  var sql = `UPDATE events SET event_title = "${req.body.title}", user_name = "${req.session.username}", eventStart = "${req.body.start}", eventEnd = "${req.body.end}",
   eventLocation = "${req.body.location}", eventDescription = "${req.body.description}", reminderTime = "${req.body.start}", eventColor = "" WHERE event_id = ${req.body.event_id}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Event added");
  })
  res.redirect('back')
});

app.post("/deleteEvent", (req, res) => {
  var sql = `DELETE FROM events WHERE event_id = "${req.body.event_id}";`
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Event added");
  })
  res.redirect('back')
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  console.log(req.session)
  res.redirect('/')
})
 

// inserts events into the database
app.post("/api/events", (req, res) => {
  //need to add event title to database? Also haven't figured out the colors or events yet so not added
  var sql = `INSERT INTO events (event_title, user_name, eventStart, eventEnd, eventLocation, eventDescription, reminderTime, eventColor)
  VALUES ("${req.body.title}","${req.session.username}", "${req.body.start}", "${req.body.end}", "${req.body.location}", "${req.body.description}", "${req.body.start}", "")`
  con.query(sql, function (err, result) {
    if (err) throw err;
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
