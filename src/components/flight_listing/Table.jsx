import React, { useState } from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const CustomTable = props => {
  const data = props.data;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {
            data.map(row => (
              <TableRow key={row.name}>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.calories}
                </TableCell>
                <TableCell>
                  {row.fat}
                </TableCell>
                <TableCell>
                  {row.carbs}
                </TableCell>
                <TableCell>
                  {row.protein}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;