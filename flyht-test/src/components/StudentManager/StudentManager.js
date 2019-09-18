import React from "react";
import Axios from "../../utils/AxiosWrap";
import Pagination from "react-paginate";
import DisplayList from "../DisplayList/Displaylist";
import Container from "react-bootstrap/Container";
import { inject, observer } from "mobx-react";
import Alert from "react-bootstrap/Alert";

@inject("StudentStore")
@observer
class StudentManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentTotal: 0,
      limit: 10,
      pageCount: 1,
      selectedPage: 0,
      initialPage: 0,
      loadingMessage: false,
      errorMessage: false
    };
  }

  componentDidMount() {
    this.fetchStudents(this.state.initialPage);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  handleLimitChange = async ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    await this.setStateAsync({
      limit: value
    });
  };

  handleLimitEnter = (event) => {
    if(event.key === 'Enter'){
        this.fetchStudents(this.state.selectedPage);
      }

  }

  async calcPaginationPages() {
    let result = Math.ceil(this.state.studentTotal / this.state.limit);

    if (result === 0) {
      result = 1;
    }

    await this.setStateAsync({ pageCount: result });
  }

  updateStudent = (id, value) => {
    this.setState({ loadingMessage: true });
    let reactThis = this;
    Axios.put("students/" + id, value)
      .then(response => {
        reactThis.props.StudentStore.updateStudent(id, response.data);
        this.setState({ loadingMessage: false });
      })
      .catch(error => {
        this.setState({ errorMessage: true });
        console.log(error);
      });
  };

  createStudent = value => {
    this.setState({ loadingMessage: true });
    let reactThis = this;
    Axios.post("students", value)
      .then(response => {
        if (this.props.StudentStore.students.length < 10) {
          reactThis.props.StudentStore.addStudent(response.data);
        }
        this.setState({ loadingMessage: false });
      })
      .catch(error => {
        this.setState({ errorMessage: true });
        console.log(error);
      });
  };

  deleteStudent = id => {
    this.setState({ loadingMessage: true });
    Axios.delete("students/" + id)
      .then(response => {
        this.fetchStudents();
        this.setState({ loadingMessage: false });
      })
      .catch(error => {
        this.setState({ errorMessage: true });
        console.log(error);
      });
  };

  fetchStudents = (selectPage) => {
     this.setState({ loadingMessage: true });
    Axios.get("students", {
      params: {
        max: this.state.limit,
        skip: (this.state.limit * selectPage) > this.state.studentTotal ? 0 : (this.state.limit * selectPage),
        totals: true
      }
    })
      .then(async (response) => {
        this.props.StudentStore.resetStudents();
        this.props.StudentStore.setStudents(response.data.data);
        this.calcPaginationPages();
        console.log(selectPage);


          if (this.state.pageCount < this.state.selectedPage) {
            await this.setStateAsync({ selectedPage: 0});
          } else {
            await this.setStateAsync({ selectedPage: selectPage });
          }


        await this.setState({ studentTotal: response.data.totals.total });
        this.setState({ loadingMessage: false });
      })
      .catch(error => {
        this.setState({ errorMessage: true });
        console.log(error);
      });
  };

  paginationClickHandler = event => {
    this.fetchStudents(event.selected);
  };

  render() {
    const { StudentStore } = this.props;

    return (
      <Container>
        <Alert variant="primary" show={this.state.loadingMessage}>
          <Alert.Heading>Communicating...</Alert.Heading>
          <p>Communicating with server, please be patient.....</p>
        </Alert>
        <Alert variant="danger" show={this.state.errorMessage}>
          <Alert.Heading>Something Bad Happened</Alert.Heading>
          <p>Please contact IT for more information</p>
        </Alert>
        <DisplayList
          updateStudent={this.updateStudent}
          createStudent={this.createStudent}
          deleteStudent={this.deleteStudent}
          limit={this.state.limit}
          handleLimitChange={this.handleLimitChange}
          handleLimitEnter = {this.handleLimitEnter}
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
            forcePage={this.state.selectedPage}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            initialPage={this.state.initialPage}
            onPageChange={this.paginationClickHandler}
          ></Pagination>
        </nav>
      </Container>
    );
  }
}

export default StudentManager;
