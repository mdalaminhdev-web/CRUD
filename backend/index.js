import express from "express";
import mysql from "mysql2";

const app = express();


// Middleware 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"01988232127",
    database: "test"
});

db.connect((err) => {
    if (err) {
        console.log("Database Not Connected:", err);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});


app.get("/", (req, res) => {
    res.send("Hello this is the backend");
});

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
       })
    })

app.get("/admin", (req,res)=>{
    res.send(" Hello this is the admin panel");
})

app.get("/S", (req,res)=>{
    res.send(" Hello this is the S panel");
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = ["Title from backend", "Desc frombackend","Cover pic from bcakend"]
    db.query(q,values,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
       })
    })



app.listen(8800, () => {
    console.log("Connected to backend on port 8800");
});