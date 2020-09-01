export interface Employee {
    id: string; // number?
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    companyId: string; // number?
}

export type EmployeesState = Employee[];
export type EmployeeState = Employee;