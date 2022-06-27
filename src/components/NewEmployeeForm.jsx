// @ts-nocheck
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from "@mui/material/Grid";
import Illustration from './Illustration';
import '../styles/NewEmployee.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useDispatch } from 'react-redux/es/exports';
import { setNewEmployee } from '../features/employeeSlice';
import { addNewEmployee } from '../features/listSlice';

import { Autocomplete, FormHelperText } from '@mui/material';
import states from "../assets/data/states.json";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ModalContent from "./ModalContent";
import { Modal } from "@stebenwolf/react-modal";
import { Controller, useForm } from "react-hook-form";

export default function NewEmployeeForm() {

    


    const dispatch = useDispatch();

    const {reset, register, handleSubmit, control, formState, formState:{errors}} = useForm(
         {defaultValues: {
            firstName: undefined,
            lastName: undefined,
            birthDate: null,
            addressStreet: undefined,
            addressCity: undefined,
            addressState: undefined,
            addressZip: undefined,
            companyDepartment: undefined,
            companyStartDate: null
         }}
    );
    const onSubmit= (data) => {
        onAddNewEmployeeClicked(data) // we create the employee
        setModal(!modal);
        /* console.log(data); */
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset])

    const firstNameValidators = {
        required:{value: true, message:'First name is required!'}
    };
    const lastNameValidators = {
        required:{value: true, message:'Last name is required!'}
    };
    const birthDateValidators = {
        required:{value: true, message:'Birth date is required!'}
    };
    const addressStreetValidators = {
        required:{value: true, message:'Street is required!'}
    };
    const addressCityValidators = {
        required:{value: true, message:'City is required!'}
    };
    const addressStateValidators = {
        required:{value: true, message:'State is required!'}
    };
    const addressZipValidators = {
        required:{value: true, message:'ZIP Code is required!', minLength: 5, maxLength:5}
    };
    const companyDepartmentValidators = {
        required:{value: true, message:'Department is required!'}
    };
    const companyStartDateValidators = {
        required:{value: true, message:'Start date is required!'}
    };

    // One state for each date field
    const [birthDate, setBirthDate] = useState(null);
    const [companyStartDate, setCompanyStartDate] = useState(null);

    // One method for each date field
    const handleDateChange = (date) => {
        const shortenDate = date.toLocaleString('en-GB').split(',').shift().split('/').reverse().join("-");
        setBirthDate(shortenDate);
    }
    const handleStartChange = (date) => {
        const shortenDate = date.toLocaleString('en-GB').split(',').shift().split('/').reverse().join("-");
        setCompanyStartDate(shortenDate);
    }

    // dealing with US States' list grouping
    const stateOptions = states.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter,
            ...option,
        };
    });

    const onAddNewEmployeeClicked = (employee) => {
        dispatch(setNewEmployee(employee));
        dispatch(addNewEmployee(employee))
    }

    // Managing modal's state
    const [modal, setModal] = useState(false);

    // checks if all inputs are filled
    //console.log(formState.dirtyFields);
    
    return (
        <div className="newEmployee">
            <div className="newEmployeeForm">
                
            <h1>Add New Employee</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root' : { m: 1, width: '20ch'},
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                onReset={() => reset()}
            >
                <div className="employee-basicInfos">
                    <h4>Basic Information</h4>
                    <Grid container>
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-firstname" 
                                label="First Name" 
                                variant="outlined"
                                {...register('firstName', firstNameValidators)}
                                error={errors.firstName !== undefined}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="outlined-lastname" 
                                label="Last Name" 
                                variant="outlined"
                                {...register('lastName', lastNameValidators)}
                                error={errors.lastName !== undefined}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    value={birthDate}
                                    control={control}
                                    onChange={handleDateChange}
                                    renderInput={() =>  // no {params} here otherwise it doesn't render correctly
                                        <TextField 
                                            label="Birth date" 
                                            variant="outlined" 
                                            required 
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} 
                                            {...register("birthDate", birthDateValidators)} 
                                            error={errors.birthDate !== undefined}
                                            helperText={errors.birthDate?.message}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>

                <div className="employee-address">
                    <h4>Address</h4>
                    <Grid container>
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-street" 
                                label="Street" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '63.5ch' }}
                                {...register('addressStreet', addressStreetValidators)}
                                error={errors.addressStreet !== undefined}
                                helperText={errors.addressStreet?.message}
                            />
                        </Grid>
                        
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-city" 
                                label="City" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '20ch' }}
                                {...register("addressCity", addressCityValidators)}
                                error={errors.addressCity !== undefined}
                                helperText={errors.addressCity?.message}
                            />
                        </Grid>

                        <Grid item>
                            <Controller 
                              name="addressState"
                              control={control}
                              defaultValue={""}
                              render={({field}) => 
                                <Autocomplete
                                  disablePortal
                                  onChange={(event, selectedState) => field.onChange(selectedState.name+" ("+selectedState.abbreviation+")")}
                                  id="combo-box"
                                  options={stateOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                  groupBy={(option) => option.firstLetter}
                                  getOptionLabel={(option) => `${option.name} (${option.abbreviation})`}
                                  
                                  inputValue={field.value}
                                  renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        label="State" 
                                        required
                                        sx={{ m: 1, minWidth: '15ch' }}
                                        {...register("addressState", addressStateValidators)}
                                        error={errors.addressState !== (null || undefined)}
                                        helperText={errors.addressState?.message}
                                    />}
                                />
                                }
                              /> 
                        </Grid>
                        
                        <Grid item>
                            <Controller 
                                name="addressZip"
                                control={control}
                                render={({field}) => 
                                    <TextField
                                    id="filled-zip"
                                    label="ZIP Code"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="e.g. 12345"
                                {...register("addressZip", addressZipValidators )}
                                error={errors.addressZip !== undefined}
                                helperText={errors.addressZip?.message}
                                />
                            } />
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-position">
                    <h4>Company</h4>
                    <Grid container>
                        <Grid item>
                            <FormControl sx={{ m: 1, minWidth: '42ch' }} 
                            error={errors.companyDepartment !== undefined}
                            >
                                <InputLabel required id="demo-simple-select-helper-label" variant='outlined'
                                
                                >Department</InputLabel>
                                <Controller 
                                    name="companyDepartment"
                                    control={control}
                                    defaultValue=''
                                    render={({field}) => {
                                        return <Select
                                        required
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={field.value}
                                        label="Department"
                                        {...register("companyDepartment", companyDepartmentValidators)}
                                        
                                    >
                                        <MenuItem value="" disabled>None</MenuItem>
                                        <MenuItem value='Engineering'>Engineering</MenuItem>
                                        <MenuItem value='Human Resources'>Human Resources</MenuItem>
                                        <MenuItem value='Legal'>Legal</MenuItem>
                                        <MenuItem value='Marketing'>Marketing</MenuItem>
                                        <MenuItem value='Sales'>Sales</MenuItem>
                                    </Select>
                                    }}
                                    />
                                {<FormHelperText>{errors.companyDepartment?.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    value={companyStartDate}
                                    control={control}
                                    onChange={handleStartChange}
                                    renderInput={(params) => 
                                        <TextField 
                                            label="Start date" 
                                            variant="outlined" 
                                            required 
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} 
                                            {...register("companyStartDate", companyStartDateValidators)} 
                                            error={errors.companyStartDate !== undefined}
                                            helperText={errors.companyStartDate?.message}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-button">
                    <Grid container={true} sx={{justifyContent: 'center', marginTop: 4}}>
                        <Grid item>
                            <Stack direction="row" spacing={2}>
                              <Button 
                                variant="outlined" 
                                startIcon={<DeleteIcon />} 
                                sx={{
                                    color: 'rgb(147, 173, 24)', 
                                    borderColor: 'rgb(147, 173, 24)',
                                    '&:hover': {
                                        borderColor: 'rgb(147, 173, 24)',
                                        backgroundColor: 'rgb(147, 173, 24, 0.3)'
                                    }
                                }} 
                                size="large"
                                type="reset"
                              >
                                Reset
                              </Button>      
                              <Button 
                                variant="contained" 
                                startIcon={<PersonAddAlt1Icon />} 
                                size="large"
                                type="submit"
                                sx={{
                                    backgroundColor: 'rgb(147, 173, 24)', 
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'rgb(110, 133, 16)',
                                    }
                                }}
                                disabled={!formState.dirtyFields.firstName
                                || !formState.dirtyFields.lastName
                                || !formState.dirtyFields.birthDate
                                || !formState.dirtyFields.addressStreet
                                || !formState.dirtyFields.addressCity
                                || !formState.dirtyFields.addressState
                                || !formState.dirtyFields.addressZip
                                || !formState.dirtyFields.companyDepartment
                                || !formState.dirtyFields.companyStartDate }
                              >
                                Create Employee
                                
                              </Button>
                              
                            </Stack>
                            {modal && <Modal 
                                modalOpen={modal} 
                                setModalOpen={setModal} 
                                content={<ModalContent />} 
                                customBackStyle={{}}
                                customModalStyle={{}}
                                customCloseStyle={{}} />}
                        </Grid>
                    </Grid>
                </div>
            </Box>
            
            
            </div>
            <div className="newEmployeeIllustration">
                <Illustration />
            </div>
        </div>
    )
}