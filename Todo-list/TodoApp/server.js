const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;

let db,
    dbConnectionStr = 'mongodb+srv://Rap:rap@cluster0.nvvvq.mongodb.net/Rap?retryWrites=true&w=majority',
    dbName = 'list'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(err =>{
        console.log(err)
    })

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req,res)=>{
    db.collection('todos').find().toArray()
    .then(data =>{
        res.render('index.ejs',{zebra: data})
    })
})

app.post('/createTodo',(req,res)=>{
    console.log(req.body.todoItem);
    db.collection('todos').insertOne({todo: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo has been added')
        res.redirect('/')
    })
})

app.delete('/deleteTodo', (req,res)=>{
    db.collection('todos').deleteOne({todo:req.body.rainbowUnicorn})
    .then(result =>{
        console.log('Deleted todo')
        res.json('Delete approved')
    })
    .catch( err => console.log(err))
})

app.listen(PORT, ()=>{
    console.log("Server running right now")
})