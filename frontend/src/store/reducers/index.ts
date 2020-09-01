import { combineReducers } from "redux";
import { companies, company } from './companies-reducer';
import { employees, employee } from './employees-reducer';
import { errors } from './errors-reducer';

export default combineReducers({
    companies,
    company,
    employees,
    employee,
    errors
});
