import { observable, computed, action } from "mobx";
import { computedFn } from "mobx-utils";

class StudentStore {
  @observable students = [];

@action.bound
resetStudents(){
    this.students.splice(0, this.students.length);
}

  @action.bound
  setStudents(value) {
    this.students = value;
  }

  @action.bound
  setStudentStatus(id, value) {
    this.students.find(function(student) {
      return student._id === id;
    }).status = value;
  }

  @action.bound
  addStudent(value) {
    this.students.push({
      StudentId: value.StudentId,
      FirstName: value.FirstName,
      LastName: value.LastName,
      Phone: value.Phone,
      status: value.status,
      _id : value._id
    });
  }

  @action.bound
  updateStudent(id, value) {
    let toUpdate = this.students.find(function(student) {
      return student._id === id;
    });

    toUpdate.StudentId = value.StudentId;
    toUpdate.FirstName = value.FirstName;
    toUpdate.LastName = value.LastName;
    toUpdate.Phone = value.Phone;
    toUpdate.status = value.status;
  }

  student = computedFn(function getStudent(id) {
    return this.students.find(function(student) {
      return student._id === id;
    });
  });

  @computed get activeStudents() {
    let activeStudents = this.students.filter(function(student) {
      return student.status === "active";
    });
    return activeStudents;
  }

  @computed get delStudents() {
    let delStudents = this.students.filter(function(student) {
      return student.status === "delinquent";
    });

    return delStudents;
  }

  @computed get dropStudents() {
    let dropStudents = this.students.filter(function(student) {
      return student.status === "dropped";
    });

    return dropStudents;
  }
}

const store = new StudentStore();
export default store;
