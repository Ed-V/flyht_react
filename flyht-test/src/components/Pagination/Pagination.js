import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const pagination = props => {
  return (
    <div>
      <ButtonGroup className="flex-wrap">
        {genButtons(props)}
      </ButtonGroup>
    </div>
  );
};

function genButtons(props){
let result=[];
for (let index = 1; index <= calcTotals(props); index++) {

if(props.selectedButton === index){
    result.push(<Button variant="secondary" key={index} data-bindex={index} onClick={props.paginationButtonClickHandler}>{index}</Button>);
} else {
    result.push(<Button variant="primary" key={index} data-bindex={index} onClick={props.paginationButtonClickHandler}>{index}</Button>);
}


}
return result;
}

function calcTotals(props) {
  let result = Math.ceil(props.studentTotal / props.limit);

  if (result === 0) {
    result = 1;
  }


  return result;
}

export default pagination;
