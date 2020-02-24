import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const CustomTable = props => {
  const data = props.data;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.departure}
                </TableCell>
                <TableCell>
                  {row.arrival}
                </TableCell>
                <TableCell>
                  {row.departureDateTime}
                </TableCell>
                <TableCell>
                  {row.arrivalDateTime}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;;