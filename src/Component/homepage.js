import React, { useState, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Favourite from "./Favourite";
import BankDetails from "./BankDetails";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#64C0B5",
      color: "#ffffff"
    }
  })
);

const Homepage = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Fragment>
      <Paper className={classes.header}>
        <h1>Bank Search Application</h1>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Bank Details" />
        <Tab label="Favourites" />
      </Tabs>

      {tabValue === 0 && <BankDetails />}
      {tabValue === 1 && <Favourite />}
    </Fragment>
  );
};

export default Homepage;
