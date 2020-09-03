import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { RootStateType } from '../types/store';
import { Employee } from "../types/employee";
import { createNewEmployee } from "../store/actions";

interface OwnProps {
    onCreated?: () => void;
}

interface State {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    companyId: string;
    modal: boolean;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

class CreateEmployeeModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
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
        this.apiCreateEmployee = this.apiCreateEmployee.bind(this);
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
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    }

    async apiCreateEmployee() {
        const employee: Employee = {
            id: '',
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            companyId: this.state.companyId,
        };

        this.props.createEmployee(employee);


        if (typeof this.props.onCreated === 'function') {
            this.props.onCreated();
        }

        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="primary" onClick={this.toggle}><FaPlus /> New employee</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create new employee</ModalHeader>
                    <ModalBody>
                        <Form>
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
                                    type="date"
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
                        <Button color="primary" onClick={this.apiCreateEmployee}>Create</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStateType, undefined, AnyAction>) => ({
    createEmployee: (employee: Employee) => dispatch(createNewEmployee(employee)),
});

const CreateEmployeeModalConnected = connect(null, mapDispatchToProps)(CreateEmployeeModal);

export { CreateEmployeeModalConnected, CreateEmployeeModal };
