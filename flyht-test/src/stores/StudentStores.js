import {observable, computed, action} from "mobx"

class StudentStore{

@observable students = [];


@action.bound
setStudents(value){
    this.students = value;
}

@action.bound
setStudentStatus(id, value){
    this.students.find(function(student) {
        return student._id === id;
    }).status[0] = value;

}

@computed get activeStudents(){
    let activeStudents = this.students.filter(function(student){

        return student.status[0] === "active";
    })
    return activeStudents;
}

@computed get delStudents(){
    let delStudents = this.students.filter(function(student){

        return student.status[0] === "delinquent";
    })

    return delStudents;
}

@computed get dropStudents(){
    let dropStudents = this.students.filter(function(student){

        return student.status[0] === "dropped";
    })

    return dropStudents;
}


}

const store = new StudentStore();
export default store;