// @ts-nocheck
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Department(props) {
    
    const {department, setDepartment} = props;
    
    const inputDepartment = React.useRef();

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: '42ch' }}>
                <InputLabel required id="demo-simple-select-helper-label" variant='outlined'>Department</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={department}
                    label="Department *"
                    onChange={(event) => setDepartment(event.target.value)}
                    ref={inputDepartment}
                >
                    <MenuItem value='Engineering'>Engineering</MenuItem>
                    <MenuItem value='Human Resources'>Human Resources</MenuItem>
                    <MenuItem value='Legal'>Legal</MenuItem>
                    <MenuItem value='Marketing'>Marketing</MenuItem>
                    <MenuItem value='Sales'>Sales</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
