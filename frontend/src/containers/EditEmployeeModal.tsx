import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { RootStateType } from '../types/store';
import { Employee } from "../types/employee";
import { getEmployeeById, updateEmployee } from "../store/actions";

interface OwnProps {
    id: string;
    onEdited: () => void;
}

interface State {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    companyId: string;
    modal: boolean;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

class EditEmployeeModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            companyId: '',
            modal: false
        };

        this.handleEmployeeFirstNameChange = this.handleEmployeeFirstNameChange.bind(this);
        this.handleEmployeeLastNameChange = this.handleEmployeeLastNameChange.bind(this);
        this.handleEmployeeDateOfBirthChange = this.handleEmployeeDateOfBirthChange.bind(this);
        this.handleEmployeeCompanyIdChange = this.handleEmployeeCompanyIdChange.bind(this);
    
        this.toggle = this.toggle.bind(this);
        this.apiUpdateEmployee = this.apiUpdateEmployee.bind(this);
    }

    handleEmployeeFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState( { firstName: event.target.value } );
    }

    handleEmployeeLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState( { lastName: event.target.value } );
    }

    handleEmployeeDateOfBirthChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState( { dateOfBirth: event.target.value } );
    }

    handleEmployeeCompanyIdChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState( { companyId: event.target.value } );
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // Only get data from server when the modal content is actually visible
        if (this.state.modal !== prevState.modal && this.state.modal) {
            this.apiReadEmployee(this.props.id);
        }
    }

    async apiReadEmployee(id: string) {
        const employee = await this.props.getEmployee(id);
        if (employee) {
            this.setState({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                dateOfBirth: employee.dateOfBirth,
                companyId: employee.companyId,
            });
        }
    }

    async apiUpdateEmployee() {
        const employee: Employee = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            companyId: this.state.companyId,
        };
        await this.props.updateEmployee(employee.id, employee);

        // Inform parent component that existing company has been edited, if onEdited() defined in props
        if (typeof this.props.onEdited === 'function') {
            this.props.onEdited();
        }

        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="primary" onClick={this.toggle} size="sm"><FaEdit /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit {this.state.firstName} {this.state.lastName}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input
                                    type="number"
                                    name="id"
                                    id="id"
                                    value={this.state.id}
                                    disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">Firstname</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Firstname"
                                    value={this.state.firstName}
                                    onChange={this.handleEmployeeFirstNameChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Lastname</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Lastname"
                                    value={this.state.lastName}
                                    onChange={this.handleEmployeeLastNameChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateOfBirth">Date of birth</Label>
                                <Input
                                    type="text"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    placeholder="Date of birth"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleEmployeeDateOfBirthChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyId">Company ID</Label>
                                <Input
                                    type="text"
                                    name="companyId"
                                    id="companyId"
                                    placeholder="Company ID"
                                    value={this.state.companyId}
                                    onChange={this.handleEmployeeCompanyIdChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiUpdateEmployee}>Save changes</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStateType, undefined, AnyAction>) => ({
    getEmployee: (id: string) => dispatch(getEmployeeById(id)),
    updateEmployee: (id: string, employee: Employee) => dispatch(updateEmployee(id, employee)),
});

const EditEmployeeModalConnected = connect(null, mapDispatchToProps)(EditEmployeeModal);

export { EditEmployeeModalConnected, EditEmployeeModal };
