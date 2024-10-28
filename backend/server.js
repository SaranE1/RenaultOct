const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
 
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database: 'nodereact'
});
 
db.connect((err)=>{
    if(err) throw err;
    console.log('Connected to nodereact database....');
});
 
//Crud operation
app.get('/users',(req,res)=>{
    db.query('SELECT * FROM users',(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});
 
app.post('/users',(req,res)=>{
    const user = req.body;

    const existedOrNot = 'SELECT * from users where email = ?'

    db.query(existedOrNot, [user.email], (err, result) => {
        if(err)
            throw err

        if(result.length > 0)
            return res.status(409).json({ message: 'User already exists' });

        db.query('INSERT INTO users SET ?',user,(err,result)=>{
            if(err) throw err;
            res.json({id:result.insertId,...user});
        });
    })
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM users where id = ?'
    console.log(id)
    db.query(query, [id], (err, result) => {
        if(err){
            console.log('Error deleting user')
            return res.status(500).send('Server error')
        }

        if(result.affectedRows === 0)
            return res.status(404).send('User not found')
        
        res.status(204).send()

    })
})


 
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
 