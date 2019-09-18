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
    this.state = { studentTotal: 0, limit: 10, selectedButton: 1, calcTotals: 1 };
  }

  componentDidMount() {
    this.fetchTotalStudents();
    this.fetchStudents();
  }

<<<<<<< Updated upstream
  updateStudent(id, value){
    Axios.put("students/"+id, value)
        .then(response => {
        })
        .catch(error => {
          alert("An error occured, see console for more details");
          console.log(error);
        });
  }
=======
  calcPaginationTotals() {
    let result = Math.ceil(this.state.studentTotal / this.state.limit);
  
    if (result === 0) {
      result = 1;
    }
  
    result = 10;
  
    this.setState({calcTotals: result})
  }

  updateStudent = (id, value) => {
    let reactThis = this;
    Axios.put("students/" + id, value)
      .then(response => {
        reactThis.props.StudentStore.updateStudent(id, response.data);
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  };

  createStudent = value => {
    let reactThis = this;
    Axios.post("students", value)
      .then(response => {
        reactThis.props.StudentStore.addStudent(response.data);
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  };
>>>>>>> Stashed changes

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

  fetchTotalStudents = () => {
      let reactThis = this;
    Axios.get("students?totals=true&count=true")
      .then(response => {
        this.setState({ studentTotal: response.data.totals.count });
        this.calcPaginationTotals();
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  }

  paginationButtonClickHandler = event => {
    let buttonIndex = event.target.dataset.bindex;
    this.setState({ selectedButton: buttonIndex });
  };

  render() {
    const { StudentStore } = this.props;

    return (
      <Container>
        <DisplayList updateStudent={this.updateStudent}></DisplayList>
        <Pagination
          selectedButton={this.state.selectedButton}
          paginationButtonClickHandler={this.paginationButtonClickHandler}
          calcTotals={this.state.calcTotals}
        ></Pagination>
      </Container>
    );
  }
}

export default StudentManager;
