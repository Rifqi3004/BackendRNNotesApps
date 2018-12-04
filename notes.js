const express = require('express')  //deklarate express
const mysql = require('mysql')     //import plugin mysql install npm install --save mysql
const parser = require('body-parser') //plugin body parser install npm install --save body-parser
const app = express()
app.use(parser.json())
var cors = require('cors');
app.use(cors());
const port = 5000  //set port express
//setup connection database mysql

const connection = mysql.createConnection({
  host     : 'localhost',  //your localhost
  user     : 'root',      //your sql user
  password : 'root',      //your sql password
  database : 'arkademy_rifqi' //your database name
});

connection.connect()

//router get all data
app.get('/getNotes', (req,res) => {
  connection.query('SELECT * FROM notes ORDER BY date DESC', (err, row, fields) => {
    res.send(row)
  })
})

//router get data where condition
app.get('/getNote', (req,res) => {
  connection.query('SELECT * FROM notes where id='+req.query.id, (err, row, fields) => {
    res.send(row)
  })
})


//router post for input data
app.post('/postNote', (req, res) => {
  let id = req.body.id
  let notes = req.body.notes
  let date = req.body.date

  connection.query('insert into notes \
  (id, notes, date) \
  value("'+id+'","'+notes+'","'+date+'")', (err, respon) => {
    (!err) ? res.send({
      id : id,
      notes : notes,
      date : date
    }) : console.log(err)
  })
  
})

//routerupdate for update data
app.put('/updateNote', (req, res) => {
  let id = req.body.id
  let notes = req.body.notes
  let date = req.body.date

  connection.query('update notes set \
  notes="'+notes+'", date="'+date+'"\
   where id="'+id+'"', (err, respon) => {
    (!err) ? res.send({
      id : id,
      notes : notes,
      date : date
    }) : console.log(err)
  })
  
})

//route delete ItemNote with params 
app.delete('/deleteItemNote/:id', (req,res) => {
  let id = req.params.id
  connection.query('delete from notes where id="'+id+'"', (err, respon) => {
    (!err) ? res.send({id : id}) : console.log(err)
  })
 
})



app.listen(port,()=> console.log('connect'))