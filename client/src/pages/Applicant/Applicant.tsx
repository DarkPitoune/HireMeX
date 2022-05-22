import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router";

import {
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Paper,
  Button,
} from "@mui/material";

import JudgesComments from "./JudgesComments";

interface CurrentNote {
  PC: {
    grade: null | number;
    comment: string;
  };
  EX: {
    grade: null | number;
    comment: string;
  };
  TD: {
    grade: null | number;
    comment: string;
  };
  ID: {
    grade: null | number;
    comment: string;
  };
}

interface CellProps {
  title: string;
  currentNote: CurrentNote;
  setCurrentNote: (note: CurrentNote) => void;
}

const FormCell = (props: CellProps) => {
  const handleChangeGrade = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextNote = props.currentNote;
    switch (props.title) {
      case "TD":
        nextNote.TD.grade = parseInt(event.target.value);
        break;
      case "PC":
        nextNote.PC.grade = parseInt(event.target.value);
        break;
      case "EX":
        nextNote.EX.grade = parseInt(event.target.value);
        break;
      case "ID":
        nextNote.ID.grade = parseInt(event.target.value);
        break;
    }
    props.setCurrentNote(nextNote);
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextNote = props.currentNote;
    switch (props.title) {
      case "TD":
        nextNote.TD.comment = event.target.value;
        break;
      case "PC":
        nextNote.PC.comment = event.target.value;
        break;
      case "EX":
        nextNote.EX.comment = event.target.value;
        break;
      case "ID":
        nextNote.ID.comment = event.target.value;
        break;
    }
    props.setCurrentNote(nextNote);
  };

  return (
    <Grid item xs={6}>
      <Paper sx={{ padding: "1em" }}>
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ margin: "10px" }}>{props.title}</Box>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="outlined-number"
              label="Grade"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeGrade}
            />
          </Grid>
          <TextField
            label="Comment"
            multiline
            maxRows={4}
            variant="filled"
            sx={{ marginTop: "1em", width: "100%" }}
            onChange={handleChangeComment}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

interface AppData {
  name: string;
  appId: number;
  company: string;
}

const Applicant = () => {
  const [currentNote, setCurrentNote] = useState<CurrentNote>({
    PC: { grade: null, comment: "" },
    EX: { grade: null, comment: "" },
    TD: { grade: null, comment: "" },
    ID: { grade: null, comment: "" },
  });
  const [appData, setAppData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const appId = useParams().appId;

  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}`).then((res) => {
      setAppData(res.data.data);
      setIsLoading(false);
    });
  }, [appId]);

  const submitNotes = () => {
    const body = {
      ...currentNote,
      judgeId: 1,
      appId: appId,
    };
    axios.post(`http://localhost:3000/applicant/${appId}`, body);
  };

  return (
    <Box sx={{ margin: "1em" }}>
      {!isLoading && appData ? (
        <Grid container spacing={3} sx={{ margin: "1em" }}>
          <Grid item>
            <img
              src="https://100k-faces.glitch.me/random-image"
              height="150px"
              alt="applicant"
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ margin: "auto" }}
                >
                  {appData.name}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ margin: "auto" }}
                >
                  {appData.company}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>Loading...</p>
      )}
      <Divider />
      <Typography variant="h4" mt="1em">
        Grades and comments
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <FormCell
          title="PC"
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        <FormCell
          title="TD"
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        <FormCell
          title="EX"
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        <FormCell
          title="ID"
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
      </Grid>
      <Button
        onClick={submitNotes}
        variant="contained"
        sx={{ display: "block", margin: "1em auto" }}
      >
        Save
      </Button>
      <Divider sx={{ margin: "2em auto" }} />
      <Typography variant="h4" mt="1em" mb="1em">
        What the other judges think..
      </Typography>
      <JudgesComments />
    </Box>
  );
};

export default Applicant;
