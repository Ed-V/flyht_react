import React from "react";
import Axios from "../../utils/AxiosWrap";
import Pagination from "react-paginate";
import DisplayList from "../DisplayList/Displaylist";
import Container from "react-bootstrap/Container";
import { inject, observer } from "mobx-react";

@inject("StudentStore")
@observer
class StudentManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentTotal: 0,
      limit: 10,
      pageCount: 1
    };
  }

  componentDidMount() {
    this.fetchTotalStudents();
    this.fetchStudents();
  }

  calcPaginationPages() {
    let result = Math.ceil(this.state.studentTotal / this.state.limit);

    if (result === 0) {
      result = 1;
    }

    result = 10;

    this.setState({ pageCount: result });
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

  fetchStudents() {
    Axios.get("students", {
      params: {
        max: this.state.limit,
        skip: this.state.limit * this.state.selectedButton - 10
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
    Axios.get("students?totals=true&count=true")
      .then(response => {
        this.setState({ studentTotal: response.data.totals.count });
        this.calcPaginationPages();
      })
      .catch(error => {
        alert("An error occured, see console for more details");
        console.log(error);
      });
  };

  paginationClickHandler = event => {
    console.log(event);
  };

  render() {
    const { StudentStore } = this.props;

    return (
      <Container>
        <DisplayList
          updateStudent={this.updateStudent}
          createStudent={this.createStudent}
        ></DisplayList>
        <nav className="page">
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            initialPage={1}
            onPageChange={this.paginationButtonHandler}
          ></Pagination>
        </nav>
      </Container>
    );
  }
}

export default StudentManager;
