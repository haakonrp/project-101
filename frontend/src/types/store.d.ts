import { Company } from "./company";
import { Employee } from "./employee";
import { AppError } from "./error";

export interface RootStateType {
    companies: CompaniesState;
    company: CompanyState;
    employees: EmployeesState;
    employee: EmployeeState;
    errors: ErrorState;
}
