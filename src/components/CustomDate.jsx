import * as React from 'react';
import { Grid, Divider, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@emotion/react';
import { TextField } from "@mui/material";
import t from "../services/Translation";
import { useState, useEffect } from 'react';

/** RETURN TODAY'S DATE IN STRING (PARAM = REMOVE X DAY) */
function formatDate(remove = 0) {
  var today = new Date();
  var d = new Date();
  d.setDate(today.getDate() - remove);
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const CustomDate = (props) => {
  /** THEME AND CSS */
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: theme.palette.input.borderBottom
      },
      "& .MuiInputBase-root.Mui-focused": {
        boxShadow: '-1px 1px 5px 3px rgba(45, 180, 235,0.60)'
      }
    },
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      <Divider style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}>
        <Chip size="medium" label={t('date')} style={{ backgroundColor: theme.palette.chip.color }} />
      </Divider>

      <Grid container justifyContent="center" style={{ display: "flex", justifyContent: "center", direction: "column", alignItems: "center" }} spacing={2}>

        {/* <Grid item xs={6} md={3}> */}
        <Grid item xs={6} md={6}>
          <TextField
            className={classes.root}
            type="date"
            id="outlined-basic"
            label={t('from')}
            variant="filled"
            value={From}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Grid>

        {/* <Grid item xs={6} md={3}> */}
        <Grid item xs={6} md={6}>
          <TextField
            className={classes.root}
            type="date"
            id="outlined-basic"
            label={t('to')}
            variant="filled"
            value={To}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setTo(e.target.value)}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default CustomDate
