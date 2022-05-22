import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import {
  Paper,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@mui/material";

import { JudgeContext } from "../judgeContext";

interface Interview {
  app_name: string;
  date: string;
  app_id: number;
  company: string;
}

const Welcome = () => {
  const navigate = useNavigate();
  const { judge } = useContext(JudgeContext);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const now = new Date().toISOString().split(".")[0];
  console.log(now);

  useEffect(() => {
    axios.get(`http://localhost:3000/${judge.id}/interviews`).then((res) => {
      setInterviews(
        res.data.data.map((interview: any) => ({
          app_name: interview.name as string,
          date: interview.date as string,
          app_id: interview.app_id as number,
          company: interview.company as string,
        }))
      );
    });
  }, [judge]);

  return (
    <>
      <Typography variant="h3">Welcome {judge.name.split(" ")[0]}</Typography>
      <Typography variant="h6">Your upcoming interviews</Typography>
      <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "rgb(230, 240, 255)" }}>
            <TableRow>
              <TableCell>Applicant</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Interview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews
              .filter((interview) => interview.date > now)
              .map((interview) => (
                <TableRow
                  key={interview.date.concat(`${interview.app_id}`)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/applicant/${interview.app_id}`)}
                >
                  <TableCell component="th" scope="row">
                    {interview.app_name}
                  </TableCell>
                  <TableCell align="right">{interview.company}</TableCell>
                  <TableCell align="right">
                    {interview.date.split("T")[0]} at{" "}
                    {interview.date.split("T")[1]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Welcome;
