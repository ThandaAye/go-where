import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const TableHeader = props => {
  const { headers, sort, onSort } = props;
  return (
    <>
      <TableHead>
        <TableRow>
          {
            headers.map(header => (
              <TableCell
                key={header.label}
              // sortDirection={header.sortable ? header.so}
              >
                {
                  header.sortable ?
                    (
                      <TableSortLabel
                        active={header.sortKey === sort.by}
                        direction={sort.direction}
                        onClick={() => onSort(header.sortKey)}
                      >
                        {header.label}
                      </TableSortLabel>
                    ) :
                    header.label
                }

              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;