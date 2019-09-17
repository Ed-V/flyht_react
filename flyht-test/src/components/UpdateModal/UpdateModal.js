import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl, Form } from "react-bootstrap";

const updateModal = props => {
  return (
    <Modal show={props.show} onHide={props.hideHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="firstName">First Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="First name"
              aria-label="FirstName"
              aria-describedby="firstName"
              value={props.firstName}
              onChange={props.handleChange}
              name="updateFirstName"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="lastName">Last Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Last name"
              aria-label="Last name"
              aria-describedby="lastName"
              value={props.lastName}
              onChange={props.handleChange}
              name="updateLastName"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="studentId">Student Id</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Student Id"
              aria-label="Student Id"
              aria-describedby="studentId"
              value={props.studentId}
              onChange={props.handleChange}
              name="updateStudentId"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="phone">Phone</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Phone"
              aria-label="Phone"
              aria-describedby="phone"
              value={props.phone}
              onChange={props.handleChange}
              name="updatePhone"
            />
          </InputGroup>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="updateStatus"
              value={props.status}
              onChange={props.handleChange}
            >
              <option value="active">active</option>
              <option value="delinquent">delinquent</option>
              <option value="dropped">dropped</option>
            </Form.Control>
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={props.commitActionHandler}>{props.buttonText}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default updateModal;
