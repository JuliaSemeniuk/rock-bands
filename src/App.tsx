import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { init, setName, NewBand, addNewBand } from "./app/rock-bands-slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  const dispatch = useAppDispatch();
  const rockBands = useAppSelector((state) => state.rockBands.bands);
  const newBand = useAppSelector((state) => state.rockBands.newBand);

  useEffect(() => {
    const getSourses = async () => {
      const res = await fetch("http://localhost:3001/");
      const body = await res.json();
      dispatch(init(body));
    };
    getSourses();
    console.log(getSourses());
  }, [dispatch]);

  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const onSubmit = (newBand: NewBand) => {
    const formatedBand = {
      id: newBand.id,
      name: newBand.name,
      details: {
        years: {
          start: newBand.startYear,
          end: newBand.endYear,
        },
        origin: newBand.origin,
        members: {
          present: newBand.presentMembers,
          past: newBand.pastMembers,
        },
        picture: newBand.picture,
      },
    };
    fetch("http://localhost:3001/", {
      method: "POST",
      body: JSON.stringify(formatedBand),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(addNewBand(res)));
  };

  return (
    <div className="App">
      {/* {rockBands.map((band) => {
        return <p>{band.name}</p>;
      })} */}
      <Paper elevation={3} style={{ width: "80%" }}>
        <Button variant="outlined" onClick={() => setIsSideBarActive(true)}>
          Add Rock Band
        </Button>
        <Drawer
          anchor={"right"}
          open={isSideBarActive}
          onClose={() => setIsSideBarActive(false)}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="side-bar">
              <TextField fullWidth required id="outlined-required" label="id" />
              <TextField
                required
                id="outlined-required"
                label="name"
                onChange={(event) => {
                  dispatch(setName(event.target.value));
                }}
              />
              <TextField required id="outlined-required" label="origin" />
              <TextField required id="outlined-required" label="year start" />
              <TextField id="outlined-required" label="year end" />
              <TextField
                required
                id="outlined-required"
                label="present members"
              />
              <TextField id="outlined-required" label="past member" />
              <TextField id="outlined-required" label="image link" />
              <Button onClick={() => onSubmit(newBand)} variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </Drawer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rockBands.map((band) => (
                <TableRow
                  key={band.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {band.name}
                  </TableCell>
                  <TableCell align="right">
                    {band.details.years.start}
                  </TableCell>
                  <TableCell align="right">{band.details.years.end}</TableCell>
                  <TableCell align="right">{band.details.origin}</TableCell>
                  <TableCell align="right">
                    {band.details.members.present}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default App;
