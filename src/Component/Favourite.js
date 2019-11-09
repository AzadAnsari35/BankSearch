import React, { useEffect, useState } from "react";
import BankTable from "./BankTable";
import TextField from "@material-ui/core/TextField";
import Pagination from "material-ui-flat-pagination";
import Select from "@material-ui/core/Select";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    paginate: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },

    heading: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

const Favourite = () => {
  const classes = useStyles();
  const [favouriteRecords, setFavouriteRecords] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchFavourite = () => {
      setLoading(true);
      const value = [];
      const keys = Object.keys(localStorage);
      let i = keys.length;

      while (i--) {
        if (
          keys[i] === "BIHAR" ||
          keys[i] === "MUMBAI" ||
          keys[i] === "KERALA" ||
          keys[i] === "JAIPUR" ||
          keys[i] === "PONDICHERRY"
        )
          continue;

        value.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      setFavouriteRecords(value);
      setLoading(false);
    };
    fetchFavourite();
  }, []);

  const searchHandler = event => {
    setTerm(event.target.value);
  };

  const searchingFor = term => {
    return x =>
      x.bank_name.toLowerCase().includes(term.toLowerCase()) ||
      x.branch.toLowerCase().includes(term.toLowerCase()) ||
      false;
  };

  const handleClick = offset => {
    setOffset(offset);
  };

  const handleRecordPerPage = event => {
    setLimit(parseInt(event.target.value));
  };

  //Get current Post
  const currentfavouriteRecords = favouriteRecords
    .filter(searchingFor(term))
    .slice(offset, offset + limit);

  const toggleFavourites = (ifsc, index) => {
    if (JSON.parse(localStorage.getItem(ifsc))) {
      localStorage.removeItem(ifsc);
      setFavouriteRecords(favouriteRecords.filter(item => item.ifsc !== ifsc));
    } else {
      localStorage.setItem(ifsc, JSON.stringify(favouriteRecords[index]));
      setFavouriteRecords([...favouriteRecords, favouriteRecords[index]]);
    }
  };

  return (
    <div>
      <h1 className={classes.heading}>Favourites </h1>

      <div>
        <TextField
          id="outlined-basic"
          // className={classes.textField}
          label="Search by Bank or Branch Name"
          margin="normal"
          variant="outlined"
          onChange={searchHandler}
        />
      </div>
      <BankTable
        loading={loading}
        favourite={currentfavouriteRecords}
        onToggle={toggleFavourites}
      />
      <div className={classes.paginate}>
        <Pagination
          limit={limit}
          offset={offset}
          total={favouriteRecords.filter(searchingFor(term)).length}
          onClick={(e, offset) => handleClick(offset)}
        />

        <Select native value={limit} onChange={e => handleRecordPerPage(e)}>
          <option value="" />
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </Select>
      </div>
    </div>
  );
};

export default Favourite;
