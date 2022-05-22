import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router";

import {
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import JudgesComments from "./JudgesComments";
import { JudgeContext } from "../../judgeContext";
import NotesData from "./NotesData.d";

interface Note {
  grade: string;
  comment: string;
}
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

  const [notebyCategory, setNotebyCategory] = useState<Note>({
    grade: "",
    comment: "",
  });

  useEffect(() => {
    switch (props.title) {
      case "TD":
        setNotebyCategory({
          grade: (props.currentNote.TD.grade || "0").toString(),
          comment: props.currentNote.TD.comment,
        });
        break;
      case "PC":
        setNotebyCategory({
          grade: (props.currentNote.PC.grade || "0").toString(),
          comment: props.currentNote.PC.comment,
        });
        break;
      case "EX":
        setNotebyCategory({
          grade: (props.currentNote.EX.grade || "0").toString(),
          comment: props.currentNote.EX.comment,
        });
        break;
      case "ID":
        setNotebyCategory({
          grade: (props.currentNote.ID.grade || "0").toString(),
          comment: props.currentNote.ID.comment,
        });
        break;
      default:
        setNotebyCategory({ grade: "0", comment: "" });
    }
  });

  return (
    <Grid item xs={6}>
      <Paper sx={{ padding: "1em" }}>
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ margin: "10px" }}>{props.title}</Box>
          </Grid>
          <Grid item xs={9}>
            <TextField
              multiline
              size="small"
              label="Grade"
              defaultValue={notebyCategory.grade}
              sx={{ marginTop: "1em", width: "100%" }}
              onChange={handleChangeComment}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <TextField
            multiline
            maxRows={4}
            variant="filled"
            defaultValue={notebyCategory.comment}
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
  const navigate = useNavigate();
  const { judge } = useContext(JudgeContext);

  const [currentNote, setCurrentNote] = useState<CurrentNote>({
    PC: { grade: null, comment: "" },
    EX: { grade: null, comment: "" },
    TD: { grade: null, comment: "" },
    ID: { grade: null, comment: "" },
  });

  const appId = useParams().appId;
  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}/notes`).then((res) => {
      const comments: NotesData[] = res.data.data;
      const comment = comments.find((c: NotesData) => c.judge_id === judge.id);
      if (comment) {
        setCurrentNote({
          PC: { grade: comment.grade_PC, comment: comment.comment_PC },
          EX: { grade: comment.grade_EX, comment: comment.comment_EX },
          TD: { grade: comment.grade_TD, comment: comment.comment_TD },
          ID: { grade: comment.grade_ID, comment: comment.comment_ID },
        });
      }
    });
  }, [appId]);

  const [appData, setAppData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}`).then((res) => {
      setAppData(res.data.data);
      setIsLoading(false);
    });
  }, [appId]);

  const submitNotes = () => {
    const body = {
      ...currentNote,
      judgeId: judge.id,
      appId: appId,
    };
    axios.post(`http://localhost:3000/applicant/${appId}`, body);
  };

  return (
    <>
      <IconButton
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: "2em", left: "3em" }}
      >
        <KeyboardBackspaceOutlinedIcon />
      </IconButton>
      <Box sx={{ margin: "1em" }}>
        {judge.name === "" ? (
          <Typography variant="h3">
            Please log as a judge to see this profile
          </Typography>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </>
  );
};

export default Applicant;
