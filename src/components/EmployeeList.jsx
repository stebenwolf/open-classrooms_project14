// @ts-nocheck
import * as React from 'react';
import PropTypes from 'prop-types';
/* import { alpha } from '@mui/material/styles'; */
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
/* import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList'; */
import { visuallyHidden } from '@mui/utils';

import { useSelector } from "react-redux";

import SearchBar from 'material-ui-search-bar';
import { useState } from 'react';

import data from "../assets/data/fakeEmployees.json";

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
    const { /* onSelectAllClick, */ order, orderBy, /* numSelected, rowCount, */ onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {/* <TableCell align="center" colSpan={1}>
          </TableCell> */}
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
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all employees',
              }}
            />
          </TableCell> */}
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
    /* numSelected: PropTypes.number.isRequired, */
    onRequestSort: PropTypes.func.isRequired,
    /* onSelectAllClick: PropTypes.func.isRequired, */
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
const EnhancedTableToolbar = () => {
    /* const { numSelected } = props; */
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          /* ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }), */
        }}
      >
        {/* {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : ( */}
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            List
          </Typography>
        {/* )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}*/}
      </Toolbar>
    );
};
  
EnhancedTableToolbar.propTypes = {
    /* numSelected: PropTypes.number.isRequired, */
};

export default function EmployeeList() {

    //const employee = useSelector(state => state.employee);
    const allEmployees = useSelector(state => state.currentEmployees.list);
    const rows = [...data, ...allEmployees];

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstName');
    /* const [selected, setSelected] = React.useState([]); */
    const [page, setPage] = React.useState(0);
    /* const [dense, setDense] = React.useState(false); */
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /* const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }; */

    /* const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }; */

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /* const handleChangeDense = (event) => {
        setDense(event.target.checked);
    }; */

    /* const isSelected = (id) => selected.indexOf(id) !== -1; */

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    // SEARCH
    const [newList, setNewList] = useState(rows);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
      const filteredRows = rows.filter((row) => {
        return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
      });
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
          <EnhancedTableToolbar /* numSelected={selected.length} */ />
          
          {/* <TextField id="outlined-search" label="Search field" type="search" /> */}
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader sx={{ minWidth: 750 }} /* size={dense ? 'small' : 'medium'}  */aria-label="a dense table" aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  /* numSelected={selected.length} */
                  orderBy={orderBy}
                  /* onSelectAllClick={handleSelectAllClick} */
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {newList.slice().sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      /* const isItemSelected = isSelected(row.id); */
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                         /*  onClick={(event) => handleClick(event, row.id)} */
                          /* role="checkbox" */
                          /* aria-checked={isItemSelected} */
                          tabIndex={-1}
                          key={row.firstName+row.lastName+row.birthDate}
                          /* selected={isItemSelected} */
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                            />
                          </TableCell> */}
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
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
      </Box>
                  </div>
    )
}