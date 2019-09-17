import React from "react";
import { DragState, Droppable } from "react-dragtastic";
import StudentCard from "./StudentCard/StudentCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aux from "../../hoc/Auxiliary";
import { inject, observer } from "mobx-react";
import styles from "./DisplayListStyles.module.css";

@inject("StudentStore")
@observer
class DisplayList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleCardDropActive = (data) => {
     this.props.StudentStore.setStudentStatus(data, "active");
     this.props.updateStudent(data, {status: "active"})
  }

  handleCardDropDel = (data) => {
    this.props.StudentStore.setStudentStatus(data, "delinquent");
  }

  handleCardDropDropped = (data) => {
    this.props.StudentStore.setStudentStatus(data, "dropped");
  }

  render() {
    return (
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
          {this.props.StudentStore.activeStudents.map(function(student) {
            return (
              <StudentCard
                cid={student._id}
                key={student._id}
                firstName={student.FirstName}
                lastName={student.LastName}
                studentId={student.StudentId}
                phone={student.Phone}
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
          {this.props.StudentStore.delStudents.map(function(student) {
            return (
              <StudentCard
                cid={student._id}
                key={student._id}
                firstName={student.FirstName}
                lastName={student.LastName}
                studentId={student.StudentId}
                phone={student.Phone}
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
          {this.props.StudentStore.dropStudents.map(function(student) {
            return (
              <StudentCard
                cid={student._id}
                key={student._id}
                firstName={student.FirstName}
                lastName={student.LastName}
                studentId={student.StudentId}
                phone={student.Phone}
              ></StudentCard>
            );
          })}
        </Col>
      </Row>
    );
  }
}

export default DisplayList;
