import {observable, computed, action} from "mobx"

class StudentStore{

@observable students = [];


@action.bound
setStudents(value){
    this.students = value;
}


}

const store = new StudentStore();
export default store;