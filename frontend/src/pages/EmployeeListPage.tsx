import React, { Component } from 'react';
import {connect} from "react-redux";
import {RootStateType} from "../types/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {deleteEmployee, getEmployees} from "../store/actions/employees-actions";
import {Button, Card, CardBody, CardText, CardTitle, Table} from "reactstrap";
import {FaMale, FaSyncAlt} from "react-icons/fa";
import {
    CreateEmployeeModalConnected,
    EditEmployeeModalConnected,
    DeleteButton,
} from "../containers";

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class EmployeeListPage extends Component<Props> {

    componentDidMount() {
        this.apiReadAllEmployees();
    }

    apiReadAllEmployees = async () => {
        this.props.getEmployees();
    }

    apiDeleteEmployee = async (id: any) => {
        await this.props.removeEmployee(id);
        this.apiReadAllEmployees();
    }

    render() {
        const employees = this.props.employees || [];

        let employeesRow: any = [];
        employees.map((employee: any) => {
            return employeesRow.push(
                <tr key={employee.id}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td>{employee.companyId}</td>
                    <td className="table-buttons">
                        <EditEmployeeModalConnected
                            id={employee.id}
                            onEdited={this.apiReadAllEmployees} />
                        <DeleteButton
                            title="Delete employee"
                            text="Are you sure you want to delete this employee?"
                            id={employee.id}
                            onYes={this.apiDeleteEmployee}/>
                    </td>
                </tr>
            );
        });

        const employeesTable = (
            <Table dark striped>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Orgnr</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {employeesRow}
                </tbody>
            </Table>
        );

        const emptyTable = (
            <p>No employees yet, use button above to add one!</p>
        );

        return (
            <Card color="white" className="shadow p-3 mb-5 rounded">
                <CardBody>
                    <CardTitle tag="h3"><FaMale /> List of employees</CardTitle>
                    <div className="card-action">
                        <Button color="secondary" onClick={this.apiReadAllEmployees}><FaSyncAlt /></Button> {' '}
                        <CreateEmployeeModalConnected onCreated={this.apiReadAllEmployees} />
                    </div>
                    <CardText tag="div">
                        {employees.length > 0 ? employeesTable : emptyTable}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    employees: state.employees
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStateType, undefined, AnyAction>) => ({
    getEmployees: () => dispatch(getEmployees()),
    removeEmployee: (id: string) => dispatch(deleteEmployee(id))
});


const EmployeeListPageConnected = connect(mapStateToProps, mapDispatchToProps)(EmployeeListPage);

export { EmployeeListPageConnected, EmployeeListPage };
