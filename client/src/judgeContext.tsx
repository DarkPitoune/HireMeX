import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";

interface Judge {
  id: number;
  name: string;
}

const JudgeContext = createContext<{
  judge: Judge;
  setJudge: (judge: Judge) => void;
}>({
  judge: {
    id: 0,
    name: "",
  },
  setJudge: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

const JudgeContextProvider = (props: ProviderProps) => {
  const [judge, setJudge] = useState<Judge>({
    id: 0,
    name: "",
  });

  return (
    <JudgeContext.Provider
      value={{
        judge: judge,
        setJudge: setJudge,
      }}
    >
      {props.children}
    </JudgeContext.Provider>
  );
};

const ChooseJudge = () => {
  const { judge, setJudge } = useContext(JudgeContext);

  const [judges, setJudges] = useState<Judge[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/judges").then((res) => {
      const fetchedJudges = res.data.data.map((judge: any) => ({
        id: judge.Judge_id,
        name: judge.Name,
      }));
      setJudges(fetchedJudges);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const newName = event.target.value as string;
    const newJudge = judges.find((judge) => judge.name === newName);
    if (newJudge) setJudge(newJudge);
  };

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        width: { xs: "100%", sm: "80%" },
        display: "flex",
        margin: "1em auto",
        justifyContent: "flex-end",
      }}
    >
      <Box sx={{ padding: "1em" }}>
        <i>You are now connected as </i>
      </Box>
      <FormControl sx={{ width: "10em" }}>
        <Select value={judge.name} onChange={handleChange} displayEmpty>
          {judges.map((judge) => (
            <MenuItem key={judge.id} value={judge.name}>
              {judge.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export { JudgeContextProvider, JudgeContext, ChooseJudge };
