import {
    GET_ALL_EMPLOYEES,
    GET_EMPLOYEE_BY_ID } from './../actions/employees-actions';
import { EmployeeActionType } from "../actions/employees-actions";
import { EmployeesState, EmployeeState } from "../../types/employee";

const initialEmployeesState: EmployeesState = [];

export function employees(state = initialEmployeesState, action: EmployeeActionType): EmployeesState {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
            return [...initialEmployeesState, ...action.employees];
        default:
            return state; 
    }
}

const initialEmployeeState: EmployeeState = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    companyId: ''
};

export function employee(state = initialEmployeeState, action: EmployeeActionType): EmployeeState {
    switch (action.type) {
        case GET_EMPLOYEE_BY_ID:
            return {...state, ...action.employee};
        default:
            return state;
    }
}
