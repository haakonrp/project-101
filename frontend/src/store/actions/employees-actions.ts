import { addErrorSuccess, ErrorsActionType } from './errors-actions';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../../types/store';
import { get, patch, post, remove } from './api';
import { AppError } from '../../types/error';
import { Action } from 'redux';
import { Employee } from "../../types/employee";

export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEE_BY_ID';

type AppThunkAction<T, U extends Action> = ThunkAction<T, RootStateType, undefined, U>;

interface GetEmployeesAction {
    type: typeof GET_ALL_EMPLOYEES;
    employees: Employee[];
}

interface GetEmployeeAction {
    type: typeof GET_EMPLOYEE_BY_ID;
    employee: Employee;
}

export type EmployeeActionType =
    GetEmployeesAction |
    GetEmployeeAction;


const getEmployeesSuccess = (employees: Employee[]): GetEmployeesAction => ({
    type: GET_ALL_EMPLOYEES,
    employees
});

const getEmployeeSuccess = (employee: Employee): GetEmployeeAction => ({
    type: GET_EMPLOYEE_BY_ID,
    employee
});


export const getEmployees = (): AppThunkAction<Promise<Employee[]>, EmployeeActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const employees = await get<Employee[]>("/employees");
        if (typeof employees !== "boolean") {
            dispatch(getEmployeesSuccess(employees));
            return Promise.resolve(employees);
        }
        return Promise.resolve([]);
    } catch (err) {
        const error: AppError = {
            message: "Failed to fetch employees"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};
