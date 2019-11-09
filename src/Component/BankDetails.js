import React, { Fragment, useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import BankTable from "./BankTable";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "material-ui-flat-pagination";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = makeStyles(theme =>
  createStyles({
    paginate: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    favourite: {
      display: "flex",
      justifyContent: "right"
    },
    head: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    dropdown: {
      display: "flex"
    },
    heading: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

const BankDetails = () => {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [term, setTerm] = useState("");
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (JSON.parse(localStorage.getItem(city))) {
        setBankDetails(JSON.parse(localStorage.getItem(city)));
        console.log(`response from cache`);
        setLoading(false);
      } else {
        const res = await axios.get(
          `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
        );
        setBankDetails(res.data);
        setLoading(false);

        if (res.data.length > 0) {
          localStorage.setItem(city, JSON.stringify(res.data));
        }
      }
    };

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
      setFavourite(value);
      setLoading(false);
    };

    fetchFavourite();

    fetchData();
  }, [city]);

  const handleChangeCity = event => {
    setCity(event.target.value);
    setOffset(0);
    setLimit(10);
  };

  const handleClick = offset => {
    setOffset(offset);
  };

  const handleRecordPerPage = event => {
    setLimit(parseInt(event.target.value));
  };

  const searchHandler = event => {
    setTerm(event.target.value);
  };

  const toggleFavourites = (ifsc, index) => {
    if (JSON.parse(localStorage.getItem(ifsc))) {
      localStorage.removeItem(ifsc);
      setFavourite(favourite.filter(item => item.ifsc !== ifsc));
    } else {
      localStorage.setItem(ifsc, JSON.stringify(bankDetails[index]));
      setFavourite([...favourite, bankDetails[index]]);
    }
  };

  const searchingFor = term => {
    return x =>
      x.bank_name.toLowerCase().includes(term.toLowerCase()) ||
      x.branch.toLowerCase().includes(term.toLowerCase()) ||
      false;
  };

  //Get current Post
  const currentBankDetails = bankDetails
    .filter(searchingFor(term))
    .slice(offset, offset + limit);

  return (
    <Fragment>
      <div className={classes.head}>
        <div className={classes.dropdown}>
          <div className={classes.selectCity}>
            <InputLabel>City</InputLabel>
            <Select value={city} onChange={handleChangeCity}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="MUMBAI">Mumbai</MenuItem>
              <MenuItem value="PONDICHERRY">Pondicherry</MenuItem>
              <MenuItem value="JAIPUR">Jaipur</MenuItem>
              <MenuItem value="KERALA">Kerala</MenuItem>
              <MenuItem value="BIHAR">Bihar</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.searchBox}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Search by Bank or Branch Name"
            margin="normal"
            variant="outlined"
            onChange={searchHandler}
          />
        </div>
      </div>

      <h1 className={classes.heading}>Bank Details</h1>
      <BankTable
        bankDetails={currentBankDetails}
        loading={loading}
        onToggle={toggleFavourites}
        favourite={favourite}
      />

      <div className={classes.paginate}>
        <Pagination
          limit={limit}
          offset={offset}
          total={bankDetails.filter(searchingFor(term)).length}
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
    </Fragment>
  );
};

BankDetails.propTypes = {};

export default BankDetails;
