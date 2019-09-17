import React from "react";
import Card from "react-bootstrap/Card";
import { Draggable, DragComponent } from "react-dragtastic";
import Aux from "../../../hoc/Auxiliary";


const studentCard = props => {
  return (
    <Aux>
      <Draggable id={props.cid} type="card">
        {({events, isActive}) => (
          <DragComponent for={props.cid} alwaysRender style="pointer-events: none">
            {({x, y, isDragging}) => (
              <Card
                {...events}
                style={{
                  position: isDragging && isActive ? "fixed" : "",
                  left: isDragging && isActive ? x : "",
                  top: isDragging && isActive ? y : ""
                }}
              >
                {props.children}
              </Card>
            )}
          </DragComponent>
        )}
      </Draggable>
    </Aux>
  );
};

export default studentCard;
