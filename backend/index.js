import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"01988232127",
    database: "test"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
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

app.listen(8800, () => {
    console.log("Connected to backend on port 8800");
});