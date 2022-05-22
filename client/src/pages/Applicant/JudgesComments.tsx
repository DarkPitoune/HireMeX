import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Grid, Paper, Box } from "@mui/material";
import { JudgeContext } from "../../judgeContext";
import NotesData from "./NotesData.d";

const JudgesComment = () => {
  const appId = useParams().appId;
  const { judge } = useContext(JudgeContext);
  const [notesData, setNotesData] = useState<null | NotesData[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}/notes`).then((res) => {
      setNotesData(res.data.data);
      setIsLoading(false);
    });
  }, [appId]);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {!isLoading && notesData ? (
        <Grid container spacing={1}>
          {notesData
            .filter((note) => note.judge_id != judge.id)
            .map((note) => (
              <Grid item xs={12} key={note.judge_id}>
                <Paper sx={{ padding: "0.3em" }}>
                  <p>
                    <i>{note.Name} says ...</i>
                  </p>
                  <Grid container>
                    <Grid item xs={6}>
                      TD : <b>{note.grade_TD}</b>
                      <Box
                        sx={{
                          backgroundColor: "rgb(245, 247, 253)",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {note.comment_TD}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      EX : <b>{note.grade_EX}</b>
                      <Box
                        sx={{
                          backgroundColor: "rgb(245, 247, 253)",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {note.comment_EX}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      ID : <b>{note.grade_ID}</b>
                      <Box
                        sx={{
                          backgroundColor: "rgb(245, 247, 253)",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {note.comment_ID}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      PC : <b>{note.grade_PC}</b>
                      <Box
                        sx={{
                          backgroundColor: "rgb(245, 247, 253)",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {note.comment_PC}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
};

export default JudgesComment;
