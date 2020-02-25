/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, CircularProgress, makeStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { FlightAction } from '../../redux/action_creators';
import { FlightType, SortOrderDirection, DateTimeFormat } from '../../constants';
import usePrevious from '../../hooks/usePrevious';
import TableHeader from './TableHeader';
import FilterHeader from './FilterHeader';
import { sortArrayOfObjByKey } from '../../utils';
import moment from 'moment';

const SortKey = {
  DEPARTURE: 'departure',
  ARRIVAL: 'arrival',
  FLIGHT_TYPE: 'flightType',
  DEPARTURE_TIME: 'departureDateTime',
  ARRIVAL_TIME: 'arrivalDateTime'
};

const noOfRowsPerPage = 5;

const InitialState = {
  loading: true,
  data: [],
  currentPage: 0,
  order: {
    by: SortKey.DEPARTURE,
    direction: SortOrderDirection.ASC
  },
  filter: {
    flightType: FlightType.ALL
  }
};

const TableHeaders = [
  { label: 'Departure', sortable: true, sortKey: SortKey.DEPARTURE, caseInsensitive: true },
  { label: 'Arrival', sortable: true, sortKey: SortKey.ARRIVAL, caseInsensitive: true },
  { label: 'Type', sortable: true, sortKey: SortKey.FLIGHT_TYPE, caseInsensitive: true },
  { label: 'Departure Time', sortable: true, sortKey: SortKey.DEPARTURE_TIME, caseInsensitive: false },
  { label: 'Arrival Time', sortable: true, sortKey: SortKey.ARRIVAL_TIME, caseInsensitive: false }
];

const styles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3)
  }
}));

const FlightListingTable = props => {
  const classes = styles();
  const [loading, setLoading] = useState(InitialState.loading);
  const [data, setData] = useState([...InitialState.data]);
  const [currentPage, setCurrentPage] = useState(InitialState.currentPage);
  const [filter, setFilter] = useState({ ...InitialState.filter });
  const [sortOrder, setSortOrder] = useState({ ...InitialState.order });

  useEffect(() => {
    props.fetchFlights();
  }, []);

  const processDataOnLoad = useCallback(() => {
    processData();
  }, [props.flights]);

  const processData = () => {
    const filteredData = filterData();
    const sortedData = sortData(filteredData);
    setData([...sortedData]);
    setLoading(false);
  };

  const previousFlightData = usePrevious(data);  
  useEffect(() => {
    if (JSON.stringify(previousFlightData) !== JSON.stringify(props.flights)) {
      processDataOnLoad();
    }
  }, [props.flights, previousFlightData, processDataOnLoad]);

  const previousSortOrder = usePrevious(sortOrder);
  const previousFilter = usePrevious(filter);

  useEffect(() => {
    if (JSON.stringify(previousSortOrder) !== JSON.stringify(sortOrder) || 
    JSON.stringify(previousFilter) !== JSON.stringify(filter)) {
      processData();
    }
  }, [sortOrder, filter]);

  const handleOnPageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filterData = () => {
    if (!props.flights.length) {
      return [];
    }

    if (filter.flightType === FlightType.ALL) {
      return props.flights;
    }

    return props.flights.filter(x => x.flightType === filter.flightType);
  };

  const sortData = filterData => {
    let data = [];
    if (filterData) {
      data = filterData;
    } else if (props.flights.length) {
      data = props.flights;
    }
    const test = sortArrayOfObjByKey(data, sortOrder.by, sortOrder.direction, sortOrder.caseInsensitive);
    return test;
  };

  const onSortRequest = (sortKey) => {
    let sortDirection = SortOrderDirection.DESC;

    if (sortKey === sortOrder.by && sortOrder.direction === SortOrderDirection.DESC) {
      sortDirection = SortOrderDirection.ASC;
    }
    const test = { by: sortKey, direction: sortDirection };
    setSortOrder({ ...test });
  };

  const onFlightTypeFilterChange = event => {
    setFilter({ flightType: event.target.value });
    setCurrentPage(InitialState.currentPage);
  };

  const pagedData = () => {
    if (currentPage === 0) {
      return data.slice(currentPage, (data.length > noOfRowsPerPage ? noOfRowsPerPage : data.length));
    }

    const start = currentPage * noOfRowsPerPage;
    const possibleEnd = start + noOfRowsPerPage;
    const end = data.length > possibleEnd ? possibleEnd : data.length;
    return data.slice(start, end);
  };

  return (
    <>
      <FilterHeader filter={filter} setFlightTypeFilter={onFlightTypeFilterChange} />
      {
        loading ?
          (<div className={classes.loading}><CircularProgress /></div>) :
          (
            <>
              <TableContainer>
                <Table>
                  <TableHeader headers={TableHeaders} sort={sortOrder} onSort={onSortRequest} />
                  <TableBody>
                    {
                      pagedData().map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {row.departure}
                          </TableCell>
                          <TableCell>
                            {row.arrival}
                          </TableCell>
                          <TableCell>
                            {row.flightType}
                          </TableCell>
                          <TableCell>
                            {moment.unix(row.departureDateTime).format(DateTimeFormat.display)}
                          </TableCell>
                          <TableCell>
                            {moment.unix(row.arrivalDateTime).format(DateTimeFormat.display)}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[noOfRowsPerPage]}
                component="div"
                count={data.length}
                rowsPerPage={noOfRowsPerPage}
                page={currentPage}
                onChangePage={handleOnPageChange}
              />
            </>
          )
      }
    </>
  );
};

const mapStateToProps = state => ({
  flights: state.flights.data
});

const mapDispatchToProps = {
  fetchFlights: FlightAction.fetchFlights
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightListingTable);
