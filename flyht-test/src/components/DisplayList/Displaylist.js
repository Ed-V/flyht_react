import React from "react";
import { DragState, Droppable } from "react-dragtastic";
import StudentCard from "./StudentCard/StudentCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aux from "../../hoc/Auxiliary";

class DisplayList extends React.Component {
  constructor(props) {
    super(props);

    this.activeGroup = React.createRef();
    this.delGroup = React.createRef();
    this.dropGroup = React.createRef();
  }

  componentDidMount() {}

  handleCardDrop(){
      alert("You dropped a card");
  }

  render() {
    return (
      <Row>
        <Col>
          <p>Active</p>

          <Droppable accepts="card" onDrop={this.handleCardDrop}>
            {DragState => (
              <div ref={this.activeGroup} {...DragState.events}>
                <StudentCard cid="1">Test 1</StudentCard>
                <StudentCard cid="2">Test 2</StudentCard>
              </div>
            )}
          </Droppable>
        </Col>
        <Col>
          <p>Delinquent</p>
          <div ref={this.delGroup}>
            <StudentCard cid="3">Test 3</StudentCard>
          </div>
        </Col>
        <Col>
          <p>Dropped</p>
          <div ref={this.dropGroup}></div>
        </Col>
      </Row>
    );
  }
}

export default DisplayList;
