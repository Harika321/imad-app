var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user: 'harikachatala09',
  database: 'harikachatala09',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: 'db-harikachatala09-88361',
  };


var app = express();
app.use(morgan('combined'));

var reports = {
    'report-one'   :  {
    title: 'report-one harika chatala',
    heading: 'report-one',
    date: '26 jan 2017,thursday',
    content: `  <div class="container">
        <div class="center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXMIMkQ2T7vMva3U86ZHgcjeo1C6jCA2lCeS7_1uvHp8UM5V7H" class="img-medium"/></div></div> <p>
                Harika always first...i like creating new things.i love sleeping.
                interested in adventures things like sky diving,mountain climbing,scuba diving.
            </p>
            <p>
                harika is a page to read but a book to understand...
                love to ride bike(royal enfield)....dream to own BMW
            </p>
            <p>
              I wants to be like a woman who completes man
                harika......"H"ours "A"yna & "R"isk "I"ntha vunna "K"aalu "A"agedhi ledhu.....</p>
    `    
},
    'report-two'   :  {
    title: 'report-two my mom...',
    heading: 'report-two',
    date: '19 june 2017,monday',
    content: ` <div class="container">
        <div class="center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-CW95jUI_Z_lGVf7Kdjc6Ram7E4_9JCe7ghigrENw1VkakhI"/></div><div><p>
               I love my mom...
             </p>
            <p>
             she is my role-model.....
            </p>
            <p>I want to show her beautiful places...and make her happy by feeling proud to have a girl like ME
        </p>`
},
        
    'report-three' :  {
    title: 'report-three my dad...',
    heading: 'report-three',
    date: '28 aug 2017,monday',
    content: `  <div class="container">
        <div class="center">
            <img src="http://c.asstatic.com/images/1849701_635067047118048750-1.jpg" class="img-medium"/></div><div> <p>
               I love my dad....
            </p>
             <p>
               He support me alot.....
            </p>
            <p>
             he is the one who understand me completely
        </p></hr>`
}
};

function createTemplate (data) {
 var title = data.title;
 var date = data.date;
 var heading = data.heading;
 var content = data.content;
 
 var htmlTemplate =`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viexport" content-width="device-width, initial scale=1" />
     <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
       <div class="container"><div>
            <a href='/'>home</a>
            <a href='/report-one'>1</a>
            <a href='/report-two'>2</a>
            <a href='/report-three'>3</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>
            ${date.toDateString()}
        </div><div>
           ${content}
           </div>
   </body>
</html>`;

return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
 // make a select request
 
 // return a response with a results
 pool.query('SELECT * FROM test', function (err, result) {
 if (err) {
     res.status(500).send(err.toString());
    }   else {
         res.send(JSON.stringify(result.rows));
     }
     });
});


var counter = 0;
app.get('/counter', function (req, res) {
            counter = counter + 1;
            res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) { // URL: /submit-name?name=shyam
    // Get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

     app.get('/reports/:reportName',function(req, res) {
    // reportName = report-one
    // reports[reportName]={} content object for report-one  
    
    // select * FROM report WHERE title = 'report-one'
    pool.query("SELECT * FROM report WHERE title = '" + req.params.reportName + "'", function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('report not found');
            } else {
                var reportData = result.rows[0];
    res.send(createTemplate(reportData));
            }
        }
     });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

