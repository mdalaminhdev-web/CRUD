
import express from "express";
import mysql from "mysql2";
import "dotenv/config";

const app = express();
const PORT = 8800;

// 1. Middleware
app.use(express.json());

// 2. MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "test"
});

// 3. Connect to Database
db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});

// 4. Home Route
app.get("/", (req, res) => {
    res.send("Hello, this is the backend!");
});

// 5. Get All Books
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching books:", err.message);
            return res.status(500).json({
                message: "Failed to fetch books"
            });
        }

        return res.status(200).json(data);
    });
});

// 6. Add a New Book
app.post("/books", (req, res) => {
    const { title, desc, cover } = req.body;

    // Validate Request Data
    if (!title || !desc || !cover) {
        return res.status(400).json({
            message: "Title, description and cover are required"
        });
    }

    const sql =
        "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)";

    const values = [title, desc, cover];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error adding book:", err.message);
            return res.status(500).json({
                message: "Failed to add book"
            });
        }

        return res.status(201).json({
            message: "Book added successfully!",
            bookId: data.insertId
        });
    });
});

// 7. Admin Route
app.get("/admin", (req, res) => {
    res.send("Hello, this is the admin panel!");
});



// 10. Start Server
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
