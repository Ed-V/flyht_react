import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const pagination = props => {
  return (
    <div>
      <ButtonGroup className="flex-wrap">
        {[...Array(props.calcTotal)].map((el, index) => {
          return (
            <Button
              variant={props.selectedButton === index+1 ? "secondary" : "primary"}
              key={index+1}
              data-bindex={index+1}
              onClick={props.paginationButtonClickHandler}
            >
              {index+1}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};





export default pagination;
