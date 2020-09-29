import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"

import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

// Styles
import {
  StyledScores,
  StyledScores__Content,
  StyledScores__Content__Title,
} from "./styled"

const useStyles = makeStyles({
  paper: {
    border: "8px solid #EBF5FA",
    maxWidth: "300px",
  },
})

const TableScores = ({ data, classes, loadingScores }) => {
  if (loadingScores)
    return (
      <>
        <Skeleton width={240} height={40} />
        <Skeleton width={240} height={40} />
        <Skeleton width={240} height={40} />
      </>
    )
  return (
    <Paper elevation={0} variant="outlined" className={classes.paper}>
      <TableContainer>
        <Table aria-label="Top Scores">
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const Scores = ({ scoresTop = [], scoresRecent = [], loadingScores }) => {
  const classes = useStyles()
  return (
    <StyledScores>
      <StyledScores__Content>
        <StyledScores__Content__Title>Top Scores</StyledScores__Content__Title>
        <TableScores
          data={scoresTop}
          classes={classes}
          loadingScores={loadingScores}
        />
      </StyledScores__Content>
      <StyledScores__Content>
        <StyledScores__Content__Title>Most Recent</StyledScores__Content__Title>
        <TableScores
          data={scoresRecent}
          classes={classes}
          loadingScores={loadingScores}
        />
      </StyledScores__Content>
    </StyledScores>
  )
}

export default Scores
