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
} from "@mui/material";

interface CellProps {
  title: string;
  content: string;
}

const FormCell = (props: CellProps) => {
  return (
    <Grid item xs={6}>
      <Paper sx={{ padding: "1em" }}>
        <span>{props.title}</span>
        <TextField
          id="outlined-number"
          label="Grade"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField label="Comment" multiline maxRows={4} variant="filled" />
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
  const [appData, setAppData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const appId = useParams().appId;

  useEffect(() => {
    axios.get(`http://localhost:3000/applicant/${appId}`).then((res) => {
      setAppData(res.data.data);
      setIsLoading(false);
    });
  }, [appId]);

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
        <FormCell title="PC" content="" />
        <FormCell title="TD" content="" />
        <FormCell title="EX" content="" />
        <FormCell title="ID" content="" />
      </Grid>
    </Box>
  );
};

export default Applicant;
