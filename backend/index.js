import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello this is the backend");
});

app.listen(8800, () => {
    console.log("Connected to backend on port 8800");
});