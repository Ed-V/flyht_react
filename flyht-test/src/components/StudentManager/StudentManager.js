import React from "react";
import Axios from "../../utils/AxiosWrap";
import Pagination from "../Pagination/Pagination";
import DisplayList from "../DisplayList/Displaylist";
import Container from "react-bootstrap/Container";
import { inject, observer } from "mobx-react";

@inject("StudentStore")
@observer
class StudentManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentTotal: 0, limit: 10, selectedButton: 1 };
  }

  componentDidMount() {
    this.fetchTotalStudents();
    this.fetchStudents();
  }

  updateStudent(id, value){
    Axios.put("students/"+id, value)
        .then(response => {
        })
        .catch(error => {
          alert("An error occured, see console for more details");
          console.log(error);
        });
  }

  fetchStudents() {
    Axios.get("students", {
      params: {
        max: this.state.limit
      }
    })
      .then(response => {
        this.props.StudentStore.setStudents(response.data);
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  }

  fetchTotalStudents() {
    Axios.get("students?totals=true&count=true")
      .then(response => {
        this.setState({ studentTotal: response.data.totals.count });
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  }

  paginationButtonClickHandler = event => {
    let buttonIndex = event.target.dataset.bindex;
    //console.log(this);
    this.setState({ selectedButton: buttonIndex });
  };

  render() {
    const { StudentStore } = this.props;

    return (
      <Container>
        <DisplayList updateStudent={this.updateStudent}></DisplayList>
        <Pagination
          studentTotal={this.state.studentTotal}
          limit={this.state.limit}
          selectedButton={this.state.selectedButton}
          paginationButtonClickHandler={this.paginationButtonClickHandler}
        ></Pagination>
      </Container>
    );
  }
}

export default StudentManager;
