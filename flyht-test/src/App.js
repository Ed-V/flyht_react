import React from "react";
import "./App.css";
import StudentManager from "./components/StudentManager/StudentManager";
import { Provider } from "mobx-react";
import StudentStore from './stores/StudentStores'

const Root = (
  <Provider StudentStore={StudentStore}>
    <div className="App">
      <StudentManager></StudentManager>
    </div>
  </Provider>
);

function App() {
  return Root;
}

export default App;
