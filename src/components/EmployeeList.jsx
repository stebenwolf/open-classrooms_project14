// @ts-nocheck
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

import { useSelector } from "react-redux";

import SearchBar from 'material-ui-search-bar';
import { useState } from 'react';

import data from "../assets/data/fakeEmployeess.json";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
      id: 'firstName',
      numeric: false,
      disablePadding: true,
      label: 'First Name'
    },
    {
      id: 'lastName',
      numeric: false,
      disablePadding: false,
      label: 'Last Name',
    },
    {
      id: 'birthDate',
      numeric: false,
      disablePadding: false,
      label: 'Birth Date',
    },
    {
      id: 'addressStreet',
      numeric: false,
      disablePadding: false,
      label: 'Street',
    },
    {
      id: 'addressCity',
      numeric: false,
      disablePadding: false,
      label: 'City',
    },
    {
      id: 'addressState',
      numeric: false,
      disablePadding: false,
      label: 'State',
    },
    {
      id: 'addressZip',
      numeric: true,
      disablePadding: false,
      label: 'ZIP Code',
    },
    {
      id: 'companyDepartment',
      numeric: false,
      disablePadding: false,
      label: 'Department',
    },
    {
      id: 'companyStartDate',
      numeric: false,
      disablePadding: false,
      label: 'Start Date',
    },
];
  
  
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={3}>
            Basic Informations
          </TableCell>
          <TableCell align="center" colSpan={4}>
            Address
          </TableCell>
          <TableCell align="center" colSpan={2}>
            Company
          </TableCell>
        </TableRow>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'left'}
              padding={headCell.disablePadding ? 'normal' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
const EnhancedTableToolbar = () => {
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List
        </Typography>
      </Toolbar>
    );
};

export default function EmployeeList() {

    const allEmployees = useSelector(state => state.currentEmployees.list);
    const rows = [...data, ...allEmployees];

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstName');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    // SEARCH
    const [newList, setNewList] = useState(rows);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
      const filteredRows = rows.filter((row) => {
        return (
          row.firstName.toLowerCase().includes(searchedVal.toLowerCase()) 
          || row.lastName.toLowerCase().includes(searchedVal.toLowerCase())
          || row.birthDate.toLowerCase().includes(searchedVal.toLowerCase())
          || row.addressStreet.toLowerCase().includes(searchedVal.toLowerCase())
          || row.addressCity.toLowerCase().includes(searchedVal.toLowerCase())
          || row.addressState.toLowerCase().includes(searchedVal.toLowerCase())
          || String(row.addressZip).toLowerCase().includes(searchedVal.toLowerCase())
          || row.companyDepartment.toLowerCase().includes(searchedVal.toLowerCase())
          || row.companyStartDate.toLowerCase().includes(searchedVal.toLowerCase())
      )});
      setNewList(filteredRows);
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

    return (<div className='employeeList'>

        <h1>Current Employees</h1>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
        <SearchBar 
            value={searched} 
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={()=>cancelSearch()}
          />
          <EnhancedTableToolbar />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table 
              stickyHeader 
              sx={{ minWidth: 750 }} 
              aria-label="a dense table" 
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {newList.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                  
                    const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.firstName+row.lastName+row.birthDate}
                        >                          
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            align="left"
                            padding="normal"
                          >
                            {row.firstName}
                          </TableCell>
                          <TableCell align="left">{row.lastName}</TableCell>
                          <TableCell align="left">{row.birthDate}</TableCell>
                          <TableCell align="left">{row.addressStreet}</TableCell>
                          <TableCell align="left">{row.addressCity}</TableCell>
                          <TableCell align="left">{row.addressState}</TableCell>
                          <TableCell align="left">{row.addressZip}</TableCell>
                          <TableCell align="left">{row.companyDepartment}</TableCell>
                          <TableCell align="left">{row.companyStartDate}</TableCell>
                        </TableRow>
                      );
                    })
                  }
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                      height: (53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={9} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      </div>
    )
}