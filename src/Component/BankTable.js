import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Spinner from "./Spinner";

const BankTable = ({ bankDetails, loading, onToggle, favourite }) => {
  if (loading) return <Spinner />;
  if (!bankDetails) bankDetails = favourite;

  return (
    <div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Favourites</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell align="right">IFSC</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">District</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Bank Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankDetails.map((bankDetail, index) => (
            <TableRow key={index} hover={true}>
              <TableCell padding="checkbox">
                <FavoriteIcon
                  onClick={() => onToggle(bankDetail.ifsc, index)}
                  style={
                    favourite.findIndex(f => f.ifsc === bankDetail.ifsc) !== -1
                      ? { color: "red" }
                      : { color: "black" }
                  }
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {bankDetail.branch}
              </TableCell>
              <TableCell align="right">{bankDetail.ifsc}</TableCell>
              <TableCell align="right">{bankDetail.address}</TableCell>
              <TableCell align="right">{bankDetail.city}</TableCell>
              <TableCell align="right">{bankDetail.district}</TableCell>
              <TableCell align="right">{bankDetail.state}</TableCell>
              <TableCell align="right">{bankDetail.bank_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

BankTable.propTypes = {
  bankDetails: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  favourite: PropTypes.array.isRequired
};

export default BankTable;
