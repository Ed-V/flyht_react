import React from "react";
import { DragState, Droppable } from "react-dragtastic";
import StudentCard from "./StudentCard/StudentCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aux from "../../hoc/Auxiliary";
import { inject, observer } from "mobx-react";
import styles from "./DisplayListStyles.module.css";
import UpdateModal from "../UpdateModal/UpdateModal";

@inject("StudentStore")
@observer
class DisplayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUpdateModal: false,
      updateFirstName: "",
      updateLastName: "",
      updateStudentId: 0,
      updatePhone: 0,
      updateStatus: "active",
      updateDbId: ""
    };
  }

  componentDidMount() {}

  handleInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  };

  handleSaveChange = () => {

  }

  handleShowUpdateModel = userId => {
    let student = this.props.StudentStore.student(userId);
    console.log(student);
    this.setState({
      updateFirstName: student.FirstName,
      updateLastName: student.LastName,
      updateStudentId: student.StudentId,
      updatePhone: student.Phone,
      updateStatus: student.status,
      updateDbId: student._id
    });


    this.setState({ showUpdateModal: true });
  };

  handleHideUpdateModel = () => {
    this.setState({ showUpdateModal: false });
  };

  handleCardDropActive = data => {
    this.props.updateStudent(data, { status: "active" });
  };

  handleCardDropDel = data => {
    this.props.updateStudent(data, { status: "delinquent" });
  };

  handleCardDropDropped = data => {
    this.props.updateStudent(data, { status: "dropped" });
  };

  render() {
    return (
      <Aux>
        <UpdateModal
          show={this.state.showUpdateModal}
          hideHandler={this.handleHideUpdateModel}
          title="Update Student"
          buttonText="Save Changes"
          firstName={this.state.updateFirstName}
          lastName={this.state.updateLastName}
          studentId={this.state.updateStudentId}
          phone={this.state.updatePhone}
          handleChange={this.handleInputChange}
          status={this.state.updateStatus}
        ></UpdateModal>
        <Row>
          <Col>
            <Droppable accepts="card" onDrop={this.handleCardDropActive}>
              {DragState => (
                <div {...DragState.events} className={styles.dropZone}>
                  <h1>Active</h1>
                  <p>Drop card here</p>
                </div>
              )}
            </Droppable>
            {this.props.StudentStore.activeStudents.map(student => {
              return (
                <StudentCard
                  cid={student._id}
                  key={student._id}
                  firstName={student.FirstName}
                  lastName={student.LastName}
                  studentId={student.StudentId}
                  phone={student.Phone}
                  showUpdateModal={this.handleShowUpdateModel}
                ></StudentCard>
              );
            })}
          </Col>
          <Col>
            <Droppable accepts="card" onDrop={this.handleCardDropDel}>
              {DragState => (
                <div {...DragState.events} className={styles.dropZone}>
                  <h1>Delinquent</h1>
                  <p>Drop card here</p>
                </div>
              )}
            </Droppable>
            {this.props.StudentStore.delStudents.map(student => {
              return (
                <StudentCard
                  cid={student._id}
                  key={student._id}
                  firstName={student.FirstName}
                  lastName={student.LastName}
                  studentId={student.StudentId}
                  phone={student.Phone}
                  showUpdateModal={this.handleShowUpdateModel}
                ></StudentCard>
              );
            })}
          </Col>
          <Col>
            <Droppable accepts="card" onDrop={this.handleCardDropDropped}>
              {DragState => (
                <div {...DragState.events} className={styles.dropZone}>
                  <h1>Dropped</h1>
                  <p>Drop card here</p>
                </div>
              )}
            </Droppable>
            {this.props.StudentStore.dropStudents.map(student => {
              return (
                <StudentCard
                  cid={student._id}
                  key={student._id}
                  firstName={student.FirstName}
                  lastName={student.LastName}
                  studentId={student.StudentId}
                  phone={student.Phone}
                  showUpdateModal={this.handleShowUpdateModel}
                ></StudentCard>
              );
            })}
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default DisplayList;
