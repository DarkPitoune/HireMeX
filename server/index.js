const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
const bp = require("body-parser");
const port = 3000;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/applicant/:appId", (req, res) => {
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

app.get("/applicant/:appId/notes", (req, res) => {
  const appId = req.params.appId;
  const sql = `SELECT * from notes JOIN judge on judge.judge_id=notes.judge_id WHERE app_id = ${appId}`;
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
});

app.post("/applicant/:appId", (req, res) => {
  const appId = req.params.appId;
  const sql = `INSERT OR REPLACE INTO notes VALUES (${req.body.judgeId}, ${appId}, "${req.body.PC.comment}", ${req.body.PC.grade}, "${req.body.EX.comment}", ${req.body.EX.grade}, "${req.body.ID.comment}", ${req.body.ID.grade}, "${req.body.TD.comment}", ${req.body.TD.grade})`;
  db.run(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log(err.message);
      return;
    }
    res.status(201);
    res.json({
      message: "success",
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
