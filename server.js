const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://admin:password@ds149433.mlab.com:49433/quotes_db', (err, database) => {
if(err) return console.log(err)
    db = database
    app.listen(3001, function(){
        console.log('listening on 3001')
    })
})

/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})*/

app.post('/quotes', (req, res) =>{
    db.collection('quotes').save(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')   
    })
});

app.get('/',(req, res) => {
    //res.sendFile(__dirname + '/index.html')
    db.collection('quotes').find().toArray(function(err, result) {
        if (err) return console.log(err)
            res.render('index.ejs', {quotes: result})
        
      })
    
})