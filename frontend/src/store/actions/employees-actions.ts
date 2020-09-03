import { addErrorSuccess, ErrorsActionType } from './errors-actions';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from '../../types/store';
import { get, patch, post, remove } from './api';
import { AppError } from '../../types/error';
import { Action } from 'redux';
import { Employee } from "../../types/employee";

export const CREATE_NEW_EMPLOYEE = 'CREATE_NEW_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEE_BY_ID';

type AppThunkAction<T, U extends Action> = ThunkAction<T, RootStateType, undefined, U>;

interface CreateEmployeeAction {
    type: typeof CREATE_NEW_EMPLOYEE;
    employee: Employee;
}

interface UpdateEmployeeAction {
    type: typeof UPDATE_EMPLOYEE;
    id: string;
    employee: Employee;
}

interface DeleteEmployeeAction {
    type: typeof DELETE_EMPLOYEE;
    id: string;
}

interface GetEmployeesAction {
    type: typeof GET_ALL_EMPLOYEES;
    employees: Employee[];
}

interface GetEmployeeAction {
    type: typeof GET_EMPLOYEE_BY_ID;
    employee: Employee;
}

export type EmployeeActionType =
    CreateEmployeeAction |
    UpdateEmployeeAction |
    DeleteEmployeeAction |
    GetEmployeesAction |
    GetEmployeeAction;


const createEmployeeSuccess = (employee: Employee): CreateEmployeeAction => ({
    type: CREATE_NEW_EMPLOYEE,
    employee
});

const updateEmployeeSuccess = (id: string, employee: Employee): UpdateEmployeeAction => ({
    type: UPDATE_EMPLOYEE,
    id,
    employee
});

const deleteEmployeeSuccess = (id: string): DeleteEmployeeAction => ({
    type: DELETE_EMPLOYEE,
    id
});

const getEmployeesSuccess = (employees: Employee[]): GetEmployeesAction => ({
    type: GET_ALL_EMPLOYEES,
    employees
});

const getEmployeeSuccess = (employee: Employee): GetEmployeeAction => ({
    type: GET_EMPLOYEE_BY_ID,
    employee
});

export const createNewEmployee = (employee: Employee): AppThunkAction<void, EmployeeActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const createdEmployee = await post<Employee>("/employees", employee);
        if (typeof createdEmployee !== "boolean") {
            dispatch(createEmployeeSuccess(createdEmployee));
        }
    } catch (err) {
        const error: AppError = {
            message: "Failed to create new employee"
        };
        dispatch(addErrorSuccess(error));
    }
};

export const updateEmployee = (id: string, employee: Employee): AppThunkAction<void, EmployeeActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const updatedEmployee = await patch<Employee>(`/employees/${id}`, employee);
        if (typeof updatedEmployee !== "boolean") {
            dispatch(updateEmployeeSuccess(id, updatedEmployee));
        }
    } catch (err) {
        const error: AppError = {
            message: "Failed to update employee"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};

export const deleteEmployee = (id: string): AppThunkAction<void, EmployeeActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const isEmployeeDeleted = await remove<boolean>(`/employees/${id}`);
        dispatch(deleteEmployeeSuccess(id));
        return Promise.resolve(isEmployeeDeleted);
    } catch (err) {
        const error: AppError = {
            message: "Failed to delete employee"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};

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

export const getEmployeeById = (id: string): AppThunkAction<Promise<Employee | null>, EmployeeActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const employee = await get<Employee>(`/employees/${id}`);
        if (typeof employee !== "boolean") {
            dispatch(getEmployeeSuccess(employee));
            return Promise.resolve(employee);
        }
        return Promise.resolve(null);
    } catch (err) {
        const error: AppError = {
            message: "Failed to fetch employee"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};
