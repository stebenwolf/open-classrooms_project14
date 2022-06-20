import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    firstName: null,
    lastName: null,
    birthDate: null,
    addressStreet: null,
    addressCity: null,
    addressState: undefined,
    addressZip: null,
    companyDepartment: '',
    companyStartDate: null
  },
  reducers: {
    setNewEmployee: (state, action) => {
        const {firstName, lastName, birthDate, addressStreet, addressCity, addressState, addressZip, companyDepartment, companyStartDate} = action.payload;
        //state = action.payload;
        state.firstName = firstName;
        state.lastName = lastName;
        state.birthDate = birthDate;
        state.addressStreet = addressStreet;
        state.addressCity = addressCity;
        state.addressState = addressState;
        state.addressZip = addressZip;
        state.companyDepartment = companyDepartment;
        state.companyStartDate = companyStartDate;
    },
    getEmployeeInfos: (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.birthDate = action.payload.birthDate;
        /* state.lastName = action.payload.body.lastName;
        state.id = action.payload.body.id;
        state.updatedAt = action.payload.body.updatedAt; */
    },
    /* logOut: state => {
      state.loggedInUser = null
    },
    logIn: state => {
      state.loggedInUser = true
    },
    editName: (state, action) => {
      state.isEditing = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setTokenPath: (state, action) => {
      state.tokenPath = action.payload
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload
    } */
  }
});

export const { setNewEmployee, getEmployeeInfos /* logIn, logOut, editName, setToken, setTokenPath, isLoading */ } = employeeSlice.actions;

export default employeeSlice.reducer;