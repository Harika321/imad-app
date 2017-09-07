var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var reports = {
    'report-one'   :  {
    title: 'report-one harika chatala',
    heading: 'report-one',
    date: '26 jan 2017,thursday',
    content: `  <div class="container">
        <div class="center">
            <img id="madi" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXMIMkQ2T7vMva3U86ZHgcjeo1C6jCA2lCeS7_1uvHp8UM5V7H" class="img-medium"/></div><div> <p>
                Harika always first...i like creating new things.i love sleeping.
                interested in adventures things like sky diving,mountain climbing,scuba diving.
            </p>
            <p>
                harika is a page to read but a book to understand...
                love to ride bike(royal enfield)....dream to own BMW
            </p>
            <p>
                wants to be like a woman who completes man
                harika......"H"ours "A"yna & "R"isk "I"ntha vunna "K"aalu "A"agedhi ledhu....
        </p></hr>    `
},
    'report-two'   :  {
    title: 'report-two my mom...',
    heading: 'report-two',
    date: '19 june 2017,monday',
    content: ` <div class="container">
        <div class="center">
            <img id="madi" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-CW95jUI_Z_lGVf7Kdjc6Ram7E4_9JCe7ghigrENw1VkakhI" class="img-medium"/></div><div> <p>
               I love my mom...
            </p>
             she is my role-model.....
            <p>
               </p>
            <p>
                 want to show her beautiful places...and make her happy by feeling proud to have a girl like ME
        </p></hr>`
},
    'report-three' :  {
    title: 'report-three my dad...',
    heading: 'report-three',
    date: '28 aug 2017,monday',
    content: `  <div class="container">
        <div class="center">
            <img id="madi" src="http://c.asstatic.com/images/1849701_635067047118048750-1.jpg" class="img-medium"/></div><div> <p>
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
            ${date}
        </div><div>
           ${content}
        </div>
    </div>
   </body>
</html>`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

     app.get('/:reportName',function(req, res) {
    // reportName = report-one
    // reports[reportName]={} content object for report-one  
    var reportName = req.params.reportName; 
    res.send(createTemplate(reports[reportName]));
});

//app.get('/report-two',function(req, res) {
  //   res.send(createTemplate(report-two));
//});

//app.get('/report-three',function(req, res) {
 //res.send(createTemplate(report-three));
//});

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

