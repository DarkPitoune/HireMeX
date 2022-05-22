const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
const port = 3000;

app.get("/applicant/:appId", cors(), (req, res) => {
  const appId = req.params.appId;
  const sql = `SELECT * FROM applicant WHERE app_id = ${appId}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows[0],
    });
  });
});

app.get("/applicant/:appId/notes", cors(), (req, res) => {
  const appId = req.params.appId;
  const sql = `SELECT * from notes JOIN judge on judge.judge_id=notes.judge_id WHERE app_id = ${appId}`
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
})

app.post("/", cors(), (req, res) => {
  const today = new Date().toJSON().split("T")[0];
  const sql = `INSERT INTO events (date, description) VALUES (${today}, "Avoir l'idée de créer un site")`;
  console.log(req);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
