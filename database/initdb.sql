DROP TABLE IF EXISTS judge;
CREATE TABLE judge (
    Name text,
    Judge_id INTEGER PRIMARY KEY AUTOINCREMENT
);
DROP TABLE IF EXISTS applicant;
CREATE TABLE applicant (
    name TEXT,
    app_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT
);
DROP TABLE IF EXISTS interview;
CREATE TABLE interview (
    date TEXT,
    app_id INTEGER,
    judge_id INTEGER,
    FOREIGN KEY (judge_id) REFERENCES judge(judge_id),
    FOREIGN KEY (app_id) REFERENCES applicant(app_id),
    PRIMARY KEY (date, app_id, judge_id)
);
DROP TABLE IF EXISTS notes;
CREATE TABLE notes (
    type TEXT,
    judge_id INTEGER,
    app_id INTEGER,
    grade INTEGER,
    comment TEXT,
    FOREIGN KEY (judge_id) REFERENCES judge(judge_id),
    FOREIGN KEY (app_id) REFERENCES applicant(app_id),
    PRIMARY KEY (type, app_id, judge_id)
)