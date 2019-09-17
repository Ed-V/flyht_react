import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Draggable, DragComponent } from "react-dragtastic";
import Aux from "../../../hoc/Auxiliary";
import Container from "react-bootstrap/Container";

const studentCard = props => {


const handleShowUpdate = () => {
    props.showUpdateModal(props.cid)
}

  return (
    <Aux>
      <Draggable id={props.cid} type="card" data={props.cid}>
        {({ events, isActive }) => (
          <DragComponent
            for={props.cid}
            alwaysRender
            style="pointer-events: none"
          >
            {({ x, y, isDragging }) => (
              <Card
                {...events}
                style={{
                  position: isDragging && isActive ? "fixed" : "",
                  left: isDragging && isActive ? x : "",
                  top: isDragging && isActive ? y : "",
                  zIndex: isDragging && isActive ? 999 : "auto"
                }}
              >
                <Card.Body>
                  <Card.Title>
                    {props.firstName} {props.lastName}
                  </Card.Title>
                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}>Student Id:</span>
                    <br />
                    {props.studentId}
                    <br />
                    <span style={{ fontWeight: "bold" }}>Phone:</span>
                    <br />
                    {props.phone}
                  </Card.Text>
                  <Button variant="success" onClick={handleShowUpdate}>Edit</Button>
                  <Button variant="danger">Delete</Button>
                </Card.Body>
              </Card>
            )}
          </DragComponent>
        )}
      </Draggable>
    </Aux>
  );
};

export default studentCard;
