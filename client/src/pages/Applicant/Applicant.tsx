import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
  }, []);

  return (
    <Box sx={{ margin: "1em" }}>
      {!isLoading && appData ? (
        <Grid container spacing={3}>
          <Grid item>
            <img
              src="https://100k-faces.glitch.me/random-image"
              height="100px"
              alt="applicant"
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  {appData.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {appData.company}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default Applicant;
