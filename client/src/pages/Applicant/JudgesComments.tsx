import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Grid, Paper } from "@mui/material";

interface NotesData {
  judge_id: number;
  app_id: number;
  comment_PC: string;
  grade_PC: number;
  comment_EX: string;
  grade_EX: number;
  comment_TD: string;
  grade_TD: number;
  comment_ID: string;
  grade_ID: number;
  Name: string;
}

const JudgesComment = () => {
  const appId = useParams().appId;
  const [notesData, setNotesData] = useState<null | NotesData[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}/notes`).then((res) => {
      setNotesData(res.data.data);
      console.log(res.data.data);
      setIsLoading(false);
    });
  }, [appId]);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {!isLoading && notesData ? (
        <Grid container>
          {notesData.map((note) => (
            <Grid item xs={12} key={note.judge_id}>
              <Paper sx={{padding: "0.3em"}}>
                <p>
                  <i>{note.Name} says ...</i>
                </p>
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
