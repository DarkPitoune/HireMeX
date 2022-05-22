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
    judge_id INTEGER,
    app_id INTEGER,
    comment_PC TEXT,
    grade_PC INTEGER,
    comment_EX TEXT,
    grade_EX INTEGER,
    comment_ID TEXT,
    grade_ID INTEGER,
    comment_TD TEXT,
    grade_TD INTEGER,
    FOREIGN KEY (judge_id) REFERENCES judge(judge_id),
    FOREIGN KEY (app_id) REFERENCES applicant(app_id),
    PRIMARY KEY (app_id, judge_id)
)